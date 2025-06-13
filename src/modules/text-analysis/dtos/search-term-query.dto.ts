import { IsNotEmpty } from 'class-validator';

export class SearchTermQueryDto {
  @IsNotEmpty({ message: 'The term field must not be empty.' })
  term: string;
}
