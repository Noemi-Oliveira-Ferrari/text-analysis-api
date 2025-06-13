import OpenAI from 'openai';
import { OpenAIService } from './open-ai.service';

jest.mock('openai');

describe('OpenAIService', () => {
  let service: OpenAIService;
  let createMock: jest.Mock;

  beforeEach(() => {
    createMock = jest.fn();

    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: createMock,
        },
      },
    }));

    service = new OpenAIService();
  });

  it('should return sentiment content when OpenAI responds with message', async () => {
    createMock.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: 'Sentiment: positive. The text is optimistic.',
          },
        },
      ],
    });

    const response = await service.analyzeSentiment('Great experience!');
    expect(response).toContain('positive');
  });

  it('should return fallback message when OpenAI response has no content', async () => {
    createMock.mockResolvedValueOnce({
      choices: [
        {
          message: {
            content: undefined,
          },
        },
      ],
    });

    const response = await service.analyzeSentiment('Some input');
    expect(response).toBe('No response from AI.');
  });

  it('should return error message if OpenAI throws', async () => {
    createMock.mockRejectedValueOnce(new Error('API error'));

    const result = await service.analyzeSentiment('This will fail');
    expect(result).toBe('Error to analyze text.');
  });
});
