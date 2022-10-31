import { Schema as SchemaType } from './enums/schema.enum';

export interface ISchema {
  name: string;
  type: SchemaType;
  description?: string;
  nullable: boolean;
  required: boolean;
}
