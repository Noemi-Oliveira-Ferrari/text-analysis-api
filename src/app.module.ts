import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TextAnalysisModule } from './modules/text-analysis/text-analysis.module';

@Module({
  imports: [ConfigModule.forRoot(), TextAnalysisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
