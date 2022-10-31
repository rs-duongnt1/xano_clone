import {
  IApiEndpoint,
  IApiEndpointInput,
  IApiEndpointResult,
  FunctionStack,
} from '@fast-api/shared/models';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'db_endpoints' })
export class ApiEndpoint implements IApiEndpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    default: false,
  })
  auth?: boolean;

  @Column({
    nullable: true,
  })
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

  @Column({
    type: 'json',
    nullable: true,
  })
  input: IApiEndpointInput[];

  @Column({
    type: 'json',
    nullable: true,
  })
  functionStacks: FunctionStack[];

  @Column({
    type: 'json',
    nullable: true,
  })
  result: IApiEndpointResult[];

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;
}
