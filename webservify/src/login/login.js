import React, {useEffect, useState} from 'react';
import {Button, Form, Input, message, Popover,Tooltip} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {NavLink, useHistory} from "react-router-dom";
import axios from 'axios';

const ViewProfileAndCloseSession = ({closeSession, userName}) => {
    let history = useHistory();
    return (
        < div style={{display: 'flex'}}>
            <NavLink to={`/Servify/Profile/${userName}`} exact
                     activeStyle={{borderBottom: '4px solid #1890ff', borderRadius: '2px'}}
                     style={{minWidth: '6vw', textAlign: 'center'}}><h4>Ver Perfil</h4></NavLink>
            <Button onClick={() => {
                closeSession();
                history.push('/Servify/')
            }} danger type="text" style={{ marginLeft: '1vw', marginTop: '8px'}}>Cerrar Sesión</Button>
        </div>
    )
}

const FormPop = ({openSession}) => {
    let history = useHistory();
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = values => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/login`, {
            ...values
        })
            .then(res => {
                openSession(res.data.token,values.username)
                history.push(`/Servify/Profile/${values.username}`)
            })
            .catch(err => message.error(err.response.data))
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
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Usuario"/>
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
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Contraseña"
                />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Tooltip title={!form.isFieldsTouched(true) ||
                        form.getFieldsError().filter(({errors}) => errors.length).length? "Ingrese primero usuario y contraseña para ingresar "  :  "Ingresa"} >
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                    >
                        Log in
                    </Button>
                    </Tooltip>
                )}
            </Form.Item>
        </Form>
    );
}
const LoginForm = ({openSession}) => {
    return (
        <Popover placement="topLeft" content={<FormPop openSession={openSession}/>} trigger="click">
            <p style={{marginRight: '1vw', marginLeft: '1vw', cursor: 'pointer'}}> Ingresá</p>
        </Popover>
    )
}

function ButtonLogin({islog, closeSession, openSession, userName}) {

    return islog ? <ViewProfileAndCloseSession closeSession={closeSession} userName={userName} /> : <LoginForm openSession={openSession}/>

}

export default ButtonLogin