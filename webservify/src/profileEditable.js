import React,{useState,useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import axios from "axios";

function ProfileEditable() {
    let { username } = useParams();
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
     
    const onFinish = values => {
      axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service`,{data:{values:{ username:username,...values}}})
        .then(res=> {alert("se agrego con exito")
                     console.log(res.data)})
        .catch(err=>alert(err.response.data))
    };
    const onFinishDelete = values => {
      console.log(values)
        axios.delete(`${process.env.REACT_APP_API_URL}/api/provider/serviced`,{data:{values:{ username:username,...values}}})
          .then(res=> {alert("se borro con exito")
                       console.log(res.data)})
          .catch(err=>alert(err.response.data))
      };
    
      return (
        <div>
          <h2>Agregar Categoria</h2>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input category',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="category" />
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
        <h2>Eliminar Categoria</h2>
        <Form form={form1} name="horizontal_login" layout="inline" onFinish={onFinishDelete}>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input category',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="category" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form1.isFieldsTouched(true) ||
                  form1.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Delete Category
              </Button>
            )}
          </Form.Item>
        </Form>
        
        </div>
          );
};
export default ProfileEditable;
