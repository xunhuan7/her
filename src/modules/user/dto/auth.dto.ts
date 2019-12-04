import { Length, MinLength, MaxLength, IsNotEmpty, IsString, IsDefined, IsInt, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

export class AuthDTO {

  @IsEmail()
  @MaxLength(200, {
    message: '邮箱长度不能超过200个字符',
  })
  email: string;

  @IsString()
  password: string;
}
