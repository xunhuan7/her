import { MinLength, IsNotEmpty, IsString, IsEmail, IsDefined } from 'class-validator';

export class RegisterDTO {

  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(6)
  password: string;

  @IsDefined()
  @IsString()
  nickname: string;

  avatar: string;

  profile: string;

  role: 'admin' | 'editor' | 'ghost';
}
