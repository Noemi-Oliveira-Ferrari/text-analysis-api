import { Module } from '@nestjs/common';
import { OpenAIModule } from '../open-ai/open-ai.module';
import { TextAnalysisController } from './text-analysis.controller';
import { TextAnalysisService } from './text-analysis.service';

@Module({
  imports: [OpenAIModule],
  providers: [TextAnalysisService],
  exports: [],
  controllers: [TextAnalysisController],
})
export class TextAnalysisModule {}
