import { Test, TestingModule } from '@nestjs/testing';
import { AdvisoryController } from './advisory.controller';

describe('AdvisoryController', () => {
  let controller: AdvisoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisoryController],
    }).compile();

    controller = module.get<AdvisoryController>(AdvisoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
