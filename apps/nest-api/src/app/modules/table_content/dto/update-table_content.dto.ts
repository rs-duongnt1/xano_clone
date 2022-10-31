import { PartialType } from '@nestjs/mapped-types';
import { CreateTableContentDto } from './create-table_content.dto';

export class UpdateTableContentDto extends PartialType(CreateTableContentDto) {}
