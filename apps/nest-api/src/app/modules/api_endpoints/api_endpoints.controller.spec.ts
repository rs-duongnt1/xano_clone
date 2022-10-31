import { Test, TestingModule } from '@nestjs/testing';
import { ApiEndpointsController } from './api_endpoints.controller';
import { ApiEndpointsService } from './api_endpoints.service';

describe('ApiEndpointsController', () => {
  let controller: ApiEndpointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiEndpointsController],
      providers: [ApiEndpointsService],
    }).compile();

    controller = module.get<ApiEndpointsController>(ApiEndpointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
