import { Schema } from '../../modules/table/dto/create-table.dto';
import { SchemaType } from '../enums/schema-type.enum';

export function generateDataBySchemas(schemas: Schema[]): any {
  const data = {};
  for (const schema of schemas) {
    if (schema.type === SchemaType.INTEGER) {
      data[schema.name] = 0;
    } else {
      data[schema.name] = null;
    }
  }

  return data;
}
