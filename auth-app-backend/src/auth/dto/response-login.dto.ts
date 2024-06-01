import { User } from '../entities/user.entity';

export class ResponseLoginDto {
  user: User;
  token: string;
}
