import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDTO {
  @ApiProperty({required: true})
  @IsNotEmpty()
  title: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  author: string;

  @ApiProperty({required: true})
  @IsNotEmpty()
  category: string;
  
  @ApiProperty({required: true})
  @IsNotEmpty()
  @IsInt()
  year: number;
}
