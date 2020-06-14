import React,{ useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import ViewEditableService from "./servicesProfile";
import { Form, Input, Button } from 'antd';
import { Descriptions } from 'antd';



function ProfileEditable() {
    let { username } = useParams();
    const  [providerSevices, setproviderSevices] = useState([])
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/api/provider/${username}`)
      .then(res=> {console.log(res.data.offerServices)
        setproviderSevices(res.data.offerServices)})
      .catch(err=>alert(err.response.data))
    },[username] )

    const layout = {labelCol: {span: 8,}, wrapperCol: {span: 16,},};
    const validateMessages = {
      required: "No puedes dejar este campo en blanco",
      types: {number: "No es un número válido",},
    
};

return (
  <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
    <div>
      <h1>{username}</h1>
{/* 
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
        name={['user', 'name']}
        label="Nombre"
        rules={[{required: true,},]}>
          <Input />
        </Form.Item>
       
        <Form.Item
        name={['user', 'phoneNmbr']}
        label="Número de teléfono"
        rules={[{required: true,},{type: "number", min: 8, max: 14}]}>
          <Input />
        </Form.Item>
        
        <Form.Item
        name={['user', 'celNmbr']}
        label="Número de celular"
        rules={[{required: true,},{type: "number"}]}>
          <Input />
        </Form.Item>
        
        <Form.Item
        name={['user', 'webPage']}
        label="Página web"
        rules={[{required: true,},]}>
          <Input />
        </Form.Item>
        
        <Form.Item
        name={['user', 'residence']}
        label="Residencia"
        rules={[{required: true,},]}>
          <Input />
        </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
*/}
{/* 
    <Descriptions title="User Info">
    <Descriptions.Item label="Nombre"> </Descriptions.Item>
    <Descriptions.Item label="Número de teléfono"> </Descriptions.Item>
    <Descriptions.Item label="Número de celular"> </Descriptions.Item>
    <Descriptions.Item label="Página Web"> </Descriptions.Item>
    <Descriptions.Item label="Residencia"> </Descriptions.Item>
    </Descriptions>,*/}
          <ViewEditableService username ={username} services={providerSevices} setServices={setproviderSevices}/>
          </div>
        </div>
          );
};
export default ProfileEditable;
