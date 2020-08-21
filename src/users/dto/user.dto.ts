import { IsEmail, IsNotEmpty, Min, Validate } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Min(6)
  password: string;
}
