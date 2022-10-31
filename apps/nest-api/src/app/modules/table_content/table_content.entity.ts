import { Table } from '../table/table.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITableContent } from '@fast-api/shared/models';

@Entity({ name: 'db_contents' })
export class TableContent implements ITableContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Table, (table) => table.contents)
  table: Table;

  @Column({
    type: 'json',
  })
  item: any;
}
