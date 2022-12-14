import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Table } from './table.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>
  ) {}
  async create(createDatabaseDto: CreateTableDto) {
    return await this.tableRepository.save(createDatabaseDto as any);
  }

  findAll() {
    return this.tableRepository.find();
  }

  findOne(id: number) {
    return this.tableRepository.findOne({ where: { id } });
  }

  findByName(name: string) {
    return this.tableRepository.findOne({ where: { name } });
  }

  findByNameAndNotId(name: string, id: number) {
    return this.tableRepository.findOne({
      where: {
        name,
        id: Not(id),
      },
    });
  }

  update(id: number, updateDatabaseDto: UpdateTableDto) {
    return this.tableRepository.update(id, updateDatabaseDto as any);
  }

  remove(id: number) {
    return `This action removes a #${id} database`;
  }
}
