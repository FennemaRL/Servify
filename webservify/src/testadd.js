import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const HorizontalLoginForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider`,{data:{values:{ username:values.username}}})
      .then(res=> {alert("Se agregó con éxito")
                   console.log(res.data)})
      .catch(err=>alert(err.response.data))
  };

  return (
    <div>
      <h2>Agregar Prestador</h2>
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Por favor ingrese una categoria',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Send
          </Button>
        )}
      </Form.Item>
    </Form>    
    </div>
  );
};
export default HorizontalLoginForm;