import { useEffect, useState } from 'react';
import {
  Field,
  formatQuery,
  QueryBuilder as ReactQueryBuilder,
  RuleGroupType,
} from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';
import { QueryBuilderAntD } from '@react-querybuilder/antd';
import { ITable } from '@fast-api/shared/models';
import { CustomValueEditor } from './custom-value-editor';
import { createQueryBuilder } from './create-query-builder';

interface QueryBuilderProps {
  table: ITable;
  change: (json: string) => void;
}

export const QueryBuilder = ({ table, change }: QueryBuilderProps) => {
  const fields: Field[] = table.schemas.map((schema) => ({
    name: `${table.name}.${schema.name}`,
    valueSources: ['field', 'value'],
    label: `${table.name}.${schema.name}`,
    table: table,
  }));
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    // not: true,
    rules: [
      // { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
      // { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
    ],
  });

  useEffect(() => {
    const json: any = JSON.parse(formatQuery(query, 'json'));

    console.log(createQueryBuilder(json));
  }, [query]);

  return (
    <>
      <QueryBuilderAntD>
        <ReactQueryBuilder
          fields={fields}
          query={query}
          showNotToggle
          onQueryChange={(q) => {
            setQuery(q);
            const json = formatQuery(query, 'json_without_ids');
            change(json);
          }}
          controlElements={{ valueEditor: CustomValueEditor }}
        />
      </QueryBuilderAntD>

      <pre>{formatQuery(query, 'sql')}</pre>
    </>
  );
};
