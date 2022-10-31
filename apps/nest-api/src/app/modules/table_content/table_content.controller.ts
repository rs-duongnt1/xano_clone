import { TableService } from './../table/table.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TableContentService } from './table_content.service';
import { CreateTableContentDto } from './dto/create-table_content.dto';
import { UpdateTableContentDto } from './dto/update-table_content.dto';
import { generateDataBySchemas } from '../../core/utils/fake-data';

@Controller('tables/:id/contents')
export class TableContentController {
  constructor(
    private readonly tableContentService: TableContentService,
    private tableService: TableService,
  ) {}

  @Post()
  async create(
    @Body() createTableContentDto: CreateTableContentDto,
    @Param('id') id: string,
  ) {
    const table = await this.tableService.findOne(+id);
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    const bodyKeys = Object.keys(createTableContentDto);
    const schemaNames = table.schemas.map((schema) => schema.name);
    const intersection = bodyKeys.filter((key) => schemaNames.includes(key));
    if (intersection.length === schemaNames.length) {
      let lastRecordId = 1;
      const lastRecord = await this.tableContentService.findLastRecordByTable(
        table,
      );
      if (lastRecord) {
        lastRecordId = lastRecord.item.id + 1;
      }
      const content = Object.fromEntries(
        Object.entries(createTableContentDto).filter((key) =>
          intersection.includes(key[0]),
        ),
      );
      return this.tableContentService.create(table, {
        ...content,
        id: lastRecordId,
      });
    } else {
      throw new BadRequestException('Schema field and body field not same');
    }
  }

  @Post('generate')
  async generate(@Param('id') id: string) {
    const table = await this.tableService.findOne(+id);
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    const data = generateDataBySchemas(table.schemas);

    return await this.tableContentService.create(table, data);
  }

  @Get()
  async findByTable(@Param('id') id: string) {
    const table = await this.tableService.findOne(+id);
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    return this.tableContentService.findByTable(table);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableContentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTableContentDto: UpdateTableContentDto,
  ) {
    return this.tableContentService.update(+id, updateTableContentDto);
  }

  @Delete()
  deleteMultiple(@Param('id') id: string, @Body() contentIds: number[]) {
    return this.tableContentService.deleteMultiple(contentIds);
  }

  @Delete('clear')
  clear() {
    return this.tableContentService.clear();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableContentService.remove(+id);
  }
}
