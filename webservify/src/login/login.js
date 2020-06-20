import React, {useEffect,useState} from 'react';
import { Popover, Button, Form, Input} from 'antd'; 
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {NavLink, useHistory} from "react-router-dom";
import axios from 'axios';
    
const ViewProfileAndCloseSession=({setIslog})=>{
    let history = useHistory();
    return(
        < div style={{display:'flex'}}>
           <NavLink to="/Servify/Profile/Test" exact activeStyle={{borderBottom: '4px solid #1890ff',borderRadius:'2px'}} style={{minWidth:'6vw', textAlign:'center'}} ><h4>Ver Perfil</h4></NavLink>
           <Button onClick={()=>{setIslog(false); history.push('/Servify/')}} danger type="text" style={{marginTop:'7px',marginLeft:'1vw', }} >Cerrar Session</Button>
        </div>
    )
}

const FormPop =({setIslog})=>{
  let history = useHistory();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); 

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider/login`, {...values
    })
      .then(res => {
          localStorage.setItem("tokenUser",res.data.token)
          setIslog(true)
          history.push(`/Servify/Profile/${values.username}`)
      })
      .catch(err => alert(err.response.data))
}

  return (
    <Form form={form} name="normal_login"
    className="login-form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Ingrese su usuario por favor!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Ingrese su contraseña por favor!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Contraseña"
        />
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
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
}
const LoginForm=({setIslog})=>{
    return (
        <Popover placement="topLeft" content={<FormPop setIslog={setIslog} />} trigger="hover">
          <p style={{marginRight:'1vw',marginLeft:'1vw', cursor:'pointer',marginTop:'5px'}}> Ingresá</p>
        </Popover>
    )
}
function ButtonLogin ({islog, setIslog}){

    return  islog ? <ViewProfileAndCloseSession setIslog={setIslog}/>:<LoginForm setIslog={setIslog}/>
        
}
export default ButtonLogin