/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FunctionStackExpression {
  or: boolean;
  field: string;
  op: '=' | '>' | '<' | '!=' | 'in' | 'not-in' | 'between';
  value: any;
}

export interface FunctionStack {
  type: 'db';
  context:
    | {
        dbo: {
          id: number;
        };
      }
    | any;
  as: string;
  expressions: FunctionStackExpression[];
}
