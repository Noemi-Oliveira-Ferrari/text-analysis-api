import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  SearchTermQueryDto,
  SearchTermResponseDto,
  TextAnalysisBodyDto,
  TextAnalysisResponseDto,
} from './dtos';
import { TextAnalysisService } from './text-analysis.service';

@ApiTags('Text Analysis')
@Controller('analyze-text')
export class TextAnalysisController {
  constructor(private textAnalysisService: TextAnalysisService) {}

  @Get('/search-term')
  @ApiQuery({
    name: 'term',
    required: true,
    description: 'Term to search in analyzed texts',
    type: String,
  })
  @ApiOkResponse({ type: SearchTermResponseDto })
  async searchTerm(@Query() query: SearchTermQueryDto) {
    try {
      const { term } = query;
      const result = await this.textAnalysisService.searchTerm(term);
      return result;
    } catch (error) {
      throw error;
    }
  }

  @ApiOkResponse({ type: TextAnalysisResponseDto })
  @Post()
  async sendData(@Body() data: TextAnalysisBodyDto) {
    try {
      const result = await this.textAnalysisService.analyzeText(data.text);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
