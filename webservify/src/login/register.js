import React, {useState, useEffect} from "react";
import {Button, Descriptions, Form, Input, message, Typography, Tooltip} from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const {Title,} = Typography;

function Register({openSession}){
    
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({});
    }, []);

    let history = useHistory();

    const layout = {
        labelCol: {
            span: 12,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onFinish = values => {/* modificar */
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/register`, {
            name: values.username,
            phoneNmbr: values.phoneNmbr,
            celNmbr: values.celPhoneNmbr,
            webPage: values.webPage,
            residence: values.residence,
            password: values.password
        }).then((res) => {
            openSession(res.data.token, values.username);
            message.success("Se registro con exito, ya se lo rediccionara");
            setTimeout(history.push(`/Servify/profile/${values.username}`), 400)
        }).catch(err => {
            message.error(err.response.data);
        });
    };

    function itemProfileInfo(label, name, rules, type) {
        return <Form.Item
            label={label}
            name={name}
            rules={rules}
        >
            <Input type={type}/>
        </Form.Item>;
    }
    
    return <div style={{background: ""}}>
        <Title style={{textAlign: 'center'}} level={4}>Datos de la nueva cuenta</Title>
            <Form className='formEditableInfo'
                form = {form}
                  {...layout}
                  name="basic"
                  initialValues={{
                      remember: true,
                  }}
                  onFinish={onFinish}
            >  
                {itemProfileInfo("Nombre", "username", [
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ])}
                {itemProfileInfo("Telefono", "phoneNmbr", [
                    {
                        required: true,
                        message: 'Please input your phone number',
                    },
                ], "number")}
                {itemProfileInfo("Celular", "celPhoneNmbr", [
                    {
                        required: true,
                        message: 'Please input your celphone number',
                    },
                ], "number")}
                {itemProfileInfo("Pagina Web", "webPage", [
                    {
                        required: true,
                        message: 'Please input your web page!',
                    },
                ])}
                {itemProfileInfo("Localidad", "residence", [
                    {
                        required: true,
                        message: 'Please input your residence!',
                    },
                ])}
                {itemProfileInfo("Contraseña", "password", [
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ], "password")}
               
                <Form.Item shouldUpdate {...tailLayout}>
                {() => (
                    <Tooltip title={!form.isFieldsTouched(true) ||
                        form.getFieldsError().filter(({errors}) => errors.length).length? "Complete todos los campos primero para registrarse"  :  "Regitrarse"} >
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                    >
                        Registrarse
                    </Button>
                    </Tooltip>
                )}
            </Form.Item>
            </Form>
    </div>
}

export default Register;