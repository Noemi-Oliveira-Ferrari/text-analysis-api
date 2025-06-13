import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchTermDto, TextRequestDto } from './dtos';
import { TextAnalysisService } from './text-analysis.service';

@ApiTags('Text Analysis')
@Controller('analyze-text')
export class TextAnalysisController {
  constructor(private textAnalysisService: TextAnalysisService) {}

  @Get('/search-term')
  async searchTerm(@Query() query: SearchTermDto) {
    try {
      const { term } = query;
      const result = await this.textAnalysisService.searchTerm(term);
      return result;
    } catch (error) {
      console.error('Error searching term:', error);
      throw error;
    }
  }

  @Post()
  async sendData(@Body() data: TextRequestDto) {
    try {
      const result = await this.textAnalysisService.analyzeText(data.text);
      return result;
    } catch (error) {
      console.error('Error analyzing text:', error);
      throw error;
    }
  }
}
