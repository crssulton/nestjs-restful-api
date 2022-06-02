import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenDTO {
  @ApiProperty({required: true})
  @IsNotEmpty()
  refresh_token: string;
}
