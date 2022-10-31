import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApiEndpointDto } from './dto/create-api_endpoint.dto';
import { UpdateApiEndpointDto } from './dto/update-api_endpoint.dto';
import { ApiEndpoint } from './entities/api_endpoint.entity';

@Injectable()
export class ApiEndpointsService {
  constructor(
    @InjectRepository(ApiEndpoint)
    private tableRepository: Repository<ApiEndpoint>
  ) {}
  create(createApiEndpointDto: CreateApiEndpointDto) {
    return this.tableRepository.save(createApiEndpointDto);
  }

  findAll() {
    return this.tableRepository.find({});
  }

  findOne(id: number) {
    return this.tableRepository.findOne({ where: { id } });
  }

  update(id: number, updateApiEndpointDto: UpdateApiEndpointDto) {
    return this.tableRepository.update({ id }, updateApiEndpointDto);
    return `This action updates a #${id} apiEndpoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} apiEndpoint`;
  }
}
