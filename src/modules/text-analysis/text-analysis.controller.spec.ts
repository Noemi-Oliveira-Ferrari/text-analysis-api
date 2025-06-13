import { Test, TestingModule } from '@nestjs/testing';
import { SearchTermQueryDto, TextAnalysisBodyDto } from './dtos';
import { TextAnalysisController } from './text-analysis.controller';
import { TextAnalysisService } from './text-analysis.service';

describe('TextAnalysisController', () => {
  let controller: TextAnalysisController;
  let service: TextAnalysisService;

  beforeEach(async () => {
    const mockService = {
      analyzeText: jest.fn(),
      searchTerm: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextAnalysisController],
      providers: [
        {
          provide: TextAnalysisService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TextAnalysisController>(TextAnalysisController);
    service = module.get<TextAnalysisService>(TextAnalysisService);
  });

  describe('sendData', () => {
    it('should call analyzeText and return result', async () => {
      const dto: TextAnalysisBodyDto = { text: 'some text' };
      const serviceResult = {
        totalWords: 5,
        topWords: [],
        analysis: 'positive',
      };

      jest.spyOn(service, 'analyzeText').mockResolvedValue(serviceResult);

      const result = await controller.sendData(dto);

      expect(service.analyzeText).toHaveBeenCalledWith(dto.text);
      expect(result).toEqual(serviceResult);
    });

    it('should throw error if analyzeText throws', async () => {
      const dto: TextAnalysisBodyDto = { text: 'some text' };
      jest.spyOn(service, 'analyzeText').mockRejectedValue(new Error('fail'));

      await expect(controller.sendData(dto)).rejects.toThrow('fail');
    });
  });

  describe('searchTerm', () => {
    it('should call searchTerm and return result', async () => {
      const query: SearchTermQueryDto = { term: 'intelligence' };
      const serviceResult = { message: 'found', data: { text: 'some text' } };

      jest.spyOn(service, 'searchTerm').mockResolvedValue(serviceResult);

      const result = await controller.searchTerm(query);

      expect(service.searchTerm).toHaveBeenCalledWith(query.term);
      expect(result).toEqual(serviceResult);
    });

    it('should throw error if searchTerm throws', async () => {
      const query: SearchTermQueryDto = { term: 'intelligence' };
      jest.spyOn(service, 'searchTerm').mockRejectedValue(new Error('fail'));

      await expect(controller.searchTerm(query)).rejects.toThrow('fail');
    });
  });
});
