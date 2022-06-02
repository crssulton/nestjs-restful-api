import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
