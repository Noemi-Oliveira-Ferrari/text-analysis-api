import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeSentiment(text: string): Promise<string> {
    const prompt = `Leia o texto abaixo e diga em uma frase qual é o sentimento predominante (ex: positivo, negativo, neutro), com uma breve explicação:\n\nTexto:\n${text}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      return response.choices[0].message.content ?? 'No response from AI.';
    } catch (error) {
      return 'Error to analyze text.';
    }
  }
}
