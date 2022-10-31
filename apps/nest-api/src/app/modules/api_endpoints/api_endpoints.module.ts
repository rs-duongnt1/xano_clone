import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ApiEndpointsService } from './api_endpoints.service';
import { ApiEndpointsController } from './api_endpoints.controller';
import { ApiEndpoint } from './entities/api_endpoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiEndpoint])],
  controllers: [ApiEndpointsController],
  providers: [ApiEndpointsService],
})
export class ApiEndpointsModule {}
