import { ApiProperty } from '@nestjs/swagger';

export class TopWordDto {
  @ApiProperty({ example: 'lucas' })
  word: string;

  @ApiProperty({ example: 10 })
  count: number;
}

export class TextAnalysisResponseDto {
  @ApiProperty({ example: 75 })
  totalWords: number;

  @ApiProperty({
    type: [TopWordDto],
    example: [
      { word: 'inteligência', count: 4 },
      { word: 'artificial', count: 4 },
      { word: 'tecnologia', count: 2 },
      { word: 'está', count: 1 },
    ],
  })
  topWords: TopWordDto[];

  @ApiProperty({ example: 'Error to analyze text.' })
  analysis: string;
}
