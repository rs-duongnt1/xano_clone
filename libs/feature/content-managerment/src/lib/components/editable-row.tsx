import { Form } from 'antd';
import { createContext } from 'react';

const EditableContext = createContext(null);

export const EditableRow = ({ index, ...props }: any) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form as any}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
