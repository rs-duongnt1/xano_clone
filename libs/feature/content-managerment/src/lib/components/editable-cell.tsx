import { DatePicker, Input, InputNumber } from 'antd';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  schema,
  ...restProps
}: any) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(record?.item[dataIndex]);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const save = (e: any) => {
    setEditing(false);
    setValue(e.target.value);
    handleSave(e.target.value, record, dataIndex);
  };

  const saveByDatePicker = (value: any) => {
    setEditing(false);
    setValue(value.format('YYYY-MM-DD HH:mm:ss'));
    handleSave(value.format('YYYY-MM-DD HH:mm:ss'), record, dataIndex);
  };

  if (editable) {
    if (editing) {
      let childNode = (
        <Input
          ref={inputRef}
          defaultValue={value}
          onBlur={save}
          onPressEnter={save}
        />
      );

      if (schema.type === 'integer') {
        childNode = (
          <Input
            ref={inputRef}
            defaultValue={value}
            onBlur={save}
            onPressEnter={save}
            type="number"
          />
        );
      }

      if (schema.type === 'datetime') {
        const defaultValue = moment(value || moment());
        childNode = (
          <DatePicker
            defaultValue={defaultValue}
            format="YYYY-MM-DD HH:mm:ss"
            onBlur={() => setEditing(false)}
            showTime
            showNow={false}
            style={{ width: '100%', border: 'none' }}
            onOk={saveByDatePicker}
          />
        );
      }

      if (schema.type === 'password') {
        childNode = (
          <Input.Password
            ref={inputRef}
            style={{ width: '100%', border: 'none' }}
            defaultValue={value}
            onBlur={save}
            onPressEnter={save}
          />
        );
      }

      return <td {...restProps}>{childNode}</td>;
    }

    let childNode = (
      <div className="editable-row__text" onClick={() => setEditing(true)}>
        {dataIndex === 'id' ? children : value}
      </div>
    );

    if (dataIndex === 'password') {
      childNode = (
        <div className="editable-row__text" onClick={() => setEditing(true)}>
          ***************
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  } else {
    if (dataIndex === 'id') {
      const childNode = (
        <div className="editable-row__text">
          {dataIndex === 'id' ? children : value}
        </div>
      );
      return <td {...restProps}>{childNode}</td>;
    }

    return <td {...restProps}>{children}</td>;
  }
};
