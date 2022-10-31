import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from '../../../core/decorators/is-non-primitive-array';
import { SchemaType } from '../../../core/enums/schema-type.enum';

export class Schema {
  @IsString()
  name: string;

  @IsEnum(SchemaType)
  type: SchemaType;

  @IsBoolean()
  nullable: boolean;

  @IsBoolean()
  required: boolean;
}
export class CreateTableDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNonPrimitiveArray()
  @ValidateNested({ each: true })
  @Type(() => Schema)
  @IsOptional()
  schemas: Schema[];
}
