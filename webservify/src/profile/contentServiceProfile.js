import React from 'react';
import {Button, Form, Input, message} from 'antd';
import axios from 'axios';
import {GetToken} from '../login/auth'

const {TextArea} = Input;

export function FormEditService({username, service}) {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/description`, {
            username: username,
            description: values.description,
            category: service.category.categoryName
        }
        , {headers:{
            'token': 'Bearer ' + GetToken()
        }})
            .then(res => {
                message.success("se modifico la descripcion del servicio "+service.category.categoryName+" con exito")
            })
            .catch(err => {
                message.error(err.response.data)})
    };

    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
                initialValue={service.description}
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Ingrese una descripcion por favor',
                    },
                ]}
            >
                <TextArea rows={3} maxLength={150} placeholder={"Ingrese una descripcion "}/>
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                    >
                        Modificar
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export function Service({service}) {
    return (
        <div name="description">
            <p>Descripcion:</p>
            <div style={{padding:'3vh',margin: '1vh 2vw 0 2vw', backgroundColor:'#F7F9FC', minHeight: '15vh'}}>
                {service.description ? service.description : 'este proveedor por el momento no posee descripción del servicio'}
            </div>
        </div>
    )
}
