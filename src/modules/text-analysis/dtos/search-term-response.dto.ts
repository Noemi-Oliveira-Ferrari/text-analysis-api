import { ApiProperty } from '@nestjs/swagger';

export class SearchTermDataDto {
  @ApiProperty({
    example:
      'A inteligência artificial está mudando o mundo. A tecnologia de inteligência artificial permite que sistemas aprendam, se adaptem e executem tarefas que antes exigiam intervenção humana. Hoje, a inteligência artificial é usada em diagnósticos médicos, carros autônomos, atendimento ao cliente, e até na criação de arte. A popularidade da inteligência artificial cresce a cada ano, e muitas empresas estão investindo nessa tecnologia promissora. Noemi e Lucas Lucas Lucas Lucas Lucas Lucas Lucas Lucas Lucas Lucas',
  })
  text: string;
}

export class SearchTermResponseDto {
  @ApiProperty({ example: 'Search results for term: lucas' })
  message: string;

  @ApiProperty({ type: SearchTermDataDto })
  data: SearchTermDataDto;
}
