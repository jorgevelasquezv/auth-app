import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import {
  CreateUserDto,
  RegisterUserDto,
  RequestLoginDto,
  ResponseLoginDto,
  UpdateUserDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    try {
      const user = await this.userModel.create({
        password: bcrypt.hashSync(password, 10),
        ...userData,
      });
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { password } = updateUserDto;
    if (password) {
      updateUserDto.password = bcrypt.hashSync(password, 10);
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: updateUserDto,
        },
        {
          new: true,
        },
      )
      .exec();
    if (!updatedUser)
      throw new NotFoundException(`User with id ${id} not found`);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findUserById(id);
    await this.userModel
      .findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: { isActive: false },
        },
      )
      .exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<ResponseLoginDto> {
    const user = await this.create(registerUserDto);
    const token = this.getJwtToken({ id: user.id });
    return { user, token };
  }

  async login(loginDto: RequestLoginDto): Promise<ResponseLoginDto> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid credentials');
    const token = this.getJwtToken({ id: user._id.toString() });
    return { user, token };
  }

  getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
