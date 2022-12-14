import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { Table } from './table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
