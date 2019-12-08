import { MinLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegisterDTO {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  avatar: string;

  profile: string;

  role: 'admin' | 'editor' | 'ghost';
}
