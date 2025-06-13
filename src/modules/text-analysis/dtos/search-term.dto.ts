import { IsNotEmpty } from 'class-validator';

export class SearchTermDto {
  @IsNotEmpty({ message: 'The term field must not be empty.' })
  term: string;
}
