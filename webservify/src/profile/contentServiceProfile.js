import React from 'react';
import {Button, Form, Input,} from 'antd';
import axios from 'axios';

const {TextArea} = Input;

export function FormEditService({username, service}) {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/description`, {
            username: username,
            description: values.description,
            category: service.category.categoryName
        })
            .then(res => {
                alert("se agrego con exito")
                console.log(res.data)
            })
            .catch(err => alert(err.response.data))
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
            {service.description}
        </div>
    )
}
