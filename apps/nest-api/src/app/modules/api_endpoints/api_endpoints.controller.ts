import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiEndpointsService } from './api_endpoints.service';
import { CreateApiEndpointDto } from './dto/create-api_endpoint.dto';
import { UpdateApiEndpointDto } from './dto/update-api_endpoint.dto';

@Controller('endpoints')
export class ApiEndpointsController {
  constructor(private readonly apiEndpointsService: ApiEndpointsService) {}

  @Post()
  create(@Body() createApiEndpointDto: CreateApiEndpointDto) {
    return this.apiEndpointsService.create(createApiEndpointDto);
  }

  @Get()
  findAll() {
    return this.apiEndpointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apiEndpointsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApiEndpointDto: UpdateApiEndpointDto
  ) {
    return this.apiEndpointsService.update(+id, {
      functionStacks: updateApiEndpointDto.functionStacks,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiEndpointsService.remove(+id);
  }
}
