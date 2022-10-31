import { Table } from './../table/entities/table.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTableContentDto } from './dto/create-table_content.dto';
import { UpdateTableContentDto } from './dto/update-table_content.dto';
import { TableContent } from './entities/table_content.entity';

@Injectable()
export class TableContentService {
  constructor(
    @InjectRepository(TableContent)
    private tableContentCRepository: Repository<TableContent>,
  ) {}
  create(table: Table, createTableContentDto: CreateTableContentDto) {
    return this.tableContentCRepository.save({
      item: createTableContentDto,
      table: table,
    });
  }

  findByTable(table: Table) {
    return this.tableContentCRepository.find({
      where: {
        table: {
          id: table.id,
        },
      },
    });
  }

  findLastRecordByTable(table: Table) {
    return this.tableContentCRepository.findOne({
      where: {
        table: {
          id: table.id,
        },
      },
      order: {
        id: 'desc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} tableContent`;
  }

  update(id: number, updateTableContentDto: UpdateTableContentDto) {
    return this.tableContentCRepository.update(
      {
        id: id,
      },
      updateTableContentDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} tableContent`;
  }

  deleteMultiple(contentIds: number[]) {
    return this.tableContentCRepository.delete({
      id: In(contentIds),
    });
  }

  async clear() {
    return this.tableContentCRepository.clear();
  }
}
