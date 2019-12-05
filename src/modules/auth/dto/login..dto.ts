import { MinLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginDTO {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

}
