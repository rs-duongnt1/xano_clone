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
import { Schema as SchemaType } from '@fast-api/shared/models';

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
