import { TableContent } from '../../table_content/entities/table_content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schema } from '../dto/create-table.dto';

@Entity({ name: 'db_tables' })
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    type: 'json',
    nullable: true,
  })
  schemas: Schema[];

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => TableContent, (content) => content.table)
  contents: TableContent[];
}
