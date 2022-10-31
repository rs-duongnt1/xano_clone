import { TableContent } from '../table_content/table_content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ISchema, ITable } from '@fast-api/shared/models';

@Entity({ name: 'db_tables' })
export class Table implements ITable {
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
  schemas: ISchema[];

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => TableContent, (content) => content.table)
  contents: TableContent[];
}
