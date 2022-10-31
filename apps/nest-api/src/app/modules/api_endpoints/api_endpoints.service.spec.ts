import { Test, TestingModule } from '@nestjs/testing';
import { ApiEndpointsService } from './api_endpoints.service';

describe('ApiEndpointsService', () => {
  let service: ApiEndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiEndpointsService],
    }).compile();

    service = module.get<ApiEndpointsService>(ApiEndpointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
