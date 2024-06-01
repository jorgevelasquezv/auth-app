import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  RegisterUserDto,
  RequestLoginDto,
  ResponseLoginDto,
  UpdateUserDto,
} from './dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guard';
import { GetUser } from './decorators/get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto): Promise<User> {
    return this.authService.create(createAuthDto);
  }

  @Post('register')
  register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ResponseLoginDto> {
    return this.authService.login(registerUserDto);
  }

  @Post('login')
  login(@Body() loginDto: RequestLoginDto): Promise<ResponseLoginDto> {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@GetUser() user: User): Promise<User[]> {
    console.log(user);

    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  async checkToken(@GetUser() user: User): Promise<ResponseLoginDto> {
    const token: string = this.authService.getJwtToken({ id: user.id });
    return { user, token };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.authService.findUserById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateUserDto,
  ): Promise<User> {
    return this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.authService.remove(id);
  }
}
