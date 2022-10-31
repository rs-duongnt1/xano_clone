import { ITable } from '@fast-api/shared/models';
import { Select } from 'antd';
import Input from 'antd/lib/input/Input';
import { useEffect } from 'react';
import { ValueEditor, ValueEditorProps } from 'react-querybuilder';

export const CustomValueEditor = (props: ValueEditorProps) => {
  const table: ITable = props.fieldData['table'];

  useEffect(() => {
    props.handleOnChange(null);
  }, []);

  if (props.valueSource === 'field') {
    const selectOptions = table.schemas.map((schema) => ({
      label: `${table.name}.${schema.name}`,
      value: `${table.name}.${schema.name}`,
    }));

    return (
      <Select
        options={selectOptions}
        onChange={(value) => {
          props.handleOnChange(value);
        }}
      ></Select>
    );
  } else {
    return (
      <Input
        onChange={(e) => {
          props.handleOnChange(e.target.value || null);
        }}
      />
    );
  }
};
