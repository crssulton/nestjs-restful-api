import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email: string;

  @IsEmpty()
  password: string;

  @IsEmpty()
  salt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  rule: string;
}
