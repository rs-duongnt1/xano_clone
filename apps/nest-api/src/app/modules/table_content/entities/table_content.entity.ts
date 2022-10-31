import { Table } from './../../table/entities/table.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'db_contents' })
export class TableContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Table, (table) => table.contents)
  table: Table;

  @Column({
    type: 'json',
  })
  item: any;
}
