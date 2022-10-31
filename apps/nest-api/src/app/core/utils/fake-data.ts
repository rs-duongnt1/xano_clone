import { Schema as SchemaType, ISchema } from '@fast-api/shared/models';

export function generateDataBySchemas(schemas: ISchema[]): any {
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
