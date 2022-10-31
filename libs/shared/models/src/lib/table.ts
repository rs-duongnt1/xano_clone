import { ISchema } from './schema';
import { ITableContent } from './table-content';

export interface ITable {
  id: number;
  name: string;
  schemas: ISchema[];
  description: string;
  contents: ITableContent[];
}
