import { IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDTO {
  @ApiProperty({required: false})
  @IsOptional()
  name: string;

  @ApiProperty({required: false})
  @IsOptional()
  email: string;
}
