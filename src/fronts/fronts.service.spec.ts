import { Test, TestingModule } from '@nestjs/testing';
import { FrontsService } from './fronts.service';

describe('FrontsService', () => {
  let service: FrontsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FrontsService],
    }).compile();

    service = module.get<FrontsService>(FrontsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
