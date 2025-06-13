import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TextRequestDto {
  @ApiProperty({
    type: String,
    example: 'Seu texto livre aqui...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
