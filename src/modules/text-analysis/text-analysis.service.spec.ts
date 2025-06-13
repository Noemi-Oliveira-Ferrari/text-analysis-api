import { NotFoundException } from '@nestjs/common';
import { OpenAIService } from '../open-ai/open-ai.service';
import { TextAnalysisModel } from './text-analysis.model';
import { TextAnalysisService } from './text-analysis.service';

jest.mock('./text-analysis.model', () => ({
  TextAnalysisModel: {
    query: jest.fn(() => ({
      insert: jest.fn(),
      orderBy: jest.fn().mockReturnThis(),
      first: jest.fn(),
    })),
  },
}));

describe('TextAnalysisService', () => {
  let service: TextAnalysisService;
  let openAIService: OpenAIService;

  beforeEach(() => {
    openAIService = {
      analyzeSentiment: jest.fn().mockResolvedValue('Positive sentiment.'),
    } as unknown as OpenAIService;

    service = new TextAnalysisService(openAIService);
  });

  describe('analyzeText', () => {
    it('should analyze text and return word stats and sentiment', async () => {
      const mockText = 'OpenAI is great. OpenAI makes great models!';
      const result = await service.analyzeText(mockText);

      expect(result.totalWords).toBeGreaterThan(0);
      expect(result.topWords.length).toBeGreaterThan(0);
      expect(result.analysis).toBe('Positive sentiment.');
    });

    it('should throw if text is invalid', async () => {
      await expect(service.analyzeText('')).rejects.toThrow(
        'Invalid text input',
      );
      await expect(service.analyzeText(null as any)).rejects.toThrow(
        'Invalid text input',
      );
    });
  });

  describe('searchTerm', () => {
    it('should return result if term exists in latest text', async () => {
      const mockFirst = jest.fn().mockResolvedValueOnce({
        text: 'Some previous text containing intelligence',
      });

      const mockOrderBy = jest.fn().mockReturnValueOnce({ first: mockFirst });

      (TextAnalysisModel.query as jest.Mock).mockReturnValueOnce({
        orderBy: mockOrderBy,
      });

      const result = await service.searchTerm('intelligence');

      expect(result.message).toContain('Search results for term');
      expect(result.data.text).toBe(
        'Some previous text containing intelligence',
      );
    });

    it('should throw NotFoundException if no match found', async () => {
      const mockFirst = jest.fn().mockResolvedValueOnce({
        text: 'Some previous text containing intelligence',
      });

      const mockOrderBy = jest.fn().mockReturnValueOnce({ first: mockFirst });

      (TextAnalysisModel.query as jest.Mock).mockReturnValueOnce({
        orderBy: mockOrderBy,
      });

      await expect(service.searchTerm('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if no match found', async () => {
      (TextAnalysisModel.query().first as jest.Mock).mockResolvedValueOnce(
        undefined,
      );

      await expect(service.searchTerm('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw error if term is invalid', async () => {
      await expect(service.searchTerm('')).rejects.toThrow(
        'Invalid term input',
      );
      await expect(service.searchTerm(null as any)).rejects.toThrow(
        'Invalid term input',
      );
    });
  });
});
