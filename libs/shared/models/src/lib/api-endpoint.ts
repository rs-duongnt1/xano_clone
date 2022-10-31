import { FunctionStack } from './function-stack';
export interface IApiEndpointInput {
  name: string;
  type: string;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IApiEndpointResult {
  name: string;
  value: string;
  tag: string;
  filters?: any[];
}

export interface IApiEndpoint {
  id: number;

  name: string;

  auth?: boolean;

  method: Method;

  input: IApiEndpointInput[];

  functionStacks: FunctionStack[];

  result: IApiEndpointResult[];

  description?: string;
}
