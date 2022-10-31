import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('tables')
export class TableController {
  constructor(private readonly databaseService: TableService) {}

  @Post()
  async create(@Body() createDatabaseDto: CreateTableDto) {
    const table = await this.databaseService.findByName(createDatabaseDto.name);
    if (table) {
      throw new NotFoundException('Table name already exists');
    }
    return this.databaseService.create(createDatabaseDto);
  }

  @Get()
  async findAll() {
    return this.databaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databaseService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDatabaseDto: UpdateTableDto
  ) {
    const table = await this.databaseService.findOne(+id);
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    const tableByName = await this.databaseService.findByNameAndNotId(
      updateDatabaseDto.name,
      table.id
    );

    if (tableByName) {
      throw new BadRequestException('Table name already exists');
    }
    return this.databaseService.update(+id, updateDatabaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.databaseService.remove(+id);
  }
}
