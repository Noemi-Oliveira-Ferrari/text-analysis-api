import { Injectable, NotFoundException } from '@nestjs/common';
import { stopwords } from 'src/utils';
import { OpenAIService } from '../open-ai/open-ai.service';
import { SearchTermResponse, TextAnalysisResponse } from './interfaces';
import { TextAnalysisModel } from './text-analysis.model';

@Injectable()
export class TextAnalysisService {
  constructor(readonly openAIService: OpenAIService) {}

  async analyzeText(text: string): Promise<TextAnalysisResponse> {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text input');
    }

    // Normalização do texto
    const cleanedText = text.toLowerCase().replace(/[.,!?;:()"]/g, '');

    // Total de palavras (incluindo stopwords)
    const allWords = cleanedText.split(/\s+/).filter((word) => word);
    const totalWords = allWords.length;

    // Filtra stopwords e conta frequências
    const wordCounts: Record<string, number> = {};

    for (const word of allWords) {
      if (!stopwords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    }

    // Pega as 5 palavras mais frequentes (sem stopwords)
    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    const analysis = await this.openAIService.analyzeSentiment(text);

    // Salva a análise no banco de dados
    await TextAnalysisModel.query().insert({
      text,
      createdAt: new Date(),
    });

    return {
      totalWords,
      topWords,
      analysis,
    };
  }

  async searchTerm(term: string): Promise<SearchTermResponse> {
    if (!term || typeof term !== 'string') {
      throw new Error('Invalid term input');
    }

    const result = await TextAnalysisModel.query()
      .where('text', 'like', `%${term}%`)
      .orderBy('createdAt', 'desc')
      .first();

    if (!result) {
      throw new NotFoundException(`No text found containing the term: ${term}`);
    }

    return {
      message: `Search results for term: ${term}`,
      data: { text: result.text },
    };
  }
}
