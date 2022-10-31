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
import SSHDBConnection from '../../core/utils/ssh-db-connection';
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
    // const a = await SSHDBConnection({
    //   db_host: '127.0.0.1',
    //   db_port: 3306,
    //   db_username: 'root',
    //   db_password: 'Root@1234',
    //   db_database: 'tools',
    //   ssh_host: '103.18.6.159',
    //   ssh_port: 2286,
    //   ssh_user: 'root',
    //   ssh_pass: 'Gmo@12345@#$',
    // });

    // a.query('SHOW TABLES', (err, result) => {
    //   res.json(result);
    // });
    return this.databaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databaseService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDatabaseDto: UpdateTableDto,
  ) {
    const table = await this.databaseService.findOne(+id);
    if (!table) {
      throw new NotFoundException('Table not found');
    }

    const tableByName = await this.databaseService.findByNameAndNotId(
      updateDatabaseDto.name,
      table.id,
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
