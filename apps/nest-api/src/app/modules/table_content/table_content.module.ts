import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TableContentService } from './table_content.service';
import { TableContentController } from './table_content.controller';
import { TableModule } from '../table/table.module';
import { TableContent } from './table_content.entity';

@Module({
  imports: [TableModule, TypeOrmModule.forFeature([TableContent])],
  controllers: [TableContentController],
  providers: [TableContentService],
  exports: [TableContentService],
})
export class TableContentModule {}
