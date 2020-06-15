import React from 'react';
import { ViewEditableService, ViewService, } from "./servicesProfile";
import { useProviderServices } from "./useProviderServices";
import { Form, Input, Button } from 'antd';


function ProfileInfoEditable(){
    const layout = {labelCol: {span: 8,}, wrapperCol: {span: 16,},};
    const validateMessages = {
      required: "No puedes dejar este campo en blanco",
      types: {number: "No es un número válido",}}
    const onFinish = () => {}
 
    return (
    <div style= {{width: "100vw", display: "flex", justifyContent: "left"}}>  
    <Form style= {{width: "50vw"}}
      {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
</div>  )}

function ProfileInfoView(){

}

export function ProfileEditable(){
    return <Profile ComponentViewService={ViewEditableService} ComponentViewProfileInfo={ProfileInfoEditable}/>
}
export function ConsumerView(){
    return <Profile ComponentViewService={ViewService}/>
}

const Profile = ({ComponentViewService, ComponentViewProfileInfo}) => {
    let data = useProviderServices();
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ComponentViewProfileInfo {...data} />
                <ComponentViewService {...data} />
        </div>
    );
}
