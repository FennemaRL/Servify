import React, { useState} from 'react';
import {Button,  Rate,   message, Modal, Form, Input} from 'antd';
import axios from "axios";

function ModalRate({serviceName, username}){
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm()

    const calificate = (value) => {
        setVisible(false)
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/calification`,
            {
                "providerName": username,
                "serviceCategory": serviceName,
                "calificationValue": value.rating,
                "message": value.comment,
                "consumerName": value.consumerName,
                "consumerEmail": value.consumerEmail

            }).then(res => {
                message.success('This is a success message');
                setTimeout(() => window.location.reload(true), 700)
            }
        ).catch(err => console.log(err.response.data))
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    return (
        <div style={{display: "flex", flexdirection: "row", alignItems: "center", marginTop:"1vh"}}>
            <Button type="primary" onClick={showModal}>
                Calificar
            </Button>
            <Modal
                title="Califica"
                visible={visible}
                onCancel={handleCancel}
                footer={null}>
                
        <       Form form={form} onFinish={calificate}>
                <Form.Item
                    label="Nombre y Apellido"
                    name="consumerName"
                    rules={[{
                        required: true,
                        message: 'Por favor completa con tu nombre completo',
                    },]}>
                <Input />
                </Form.Item>
                <Form.Item
                    label="Correo electrónico"
                    name="consumerEmail"
                    rules={[{
                        required: true,
                        message: 'Por favor completa con tu correo electrónico',
                    },]}>
                <Input />
                </Form.Item>
                <Form.Item name="comment" label="Escribí tu opinión">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item 
                        name="rating" 
                        label= "Seleccioná un puntaje"  
                        rules={[{
                        required: true,
                        message: 'Por favor completa el puntaje',
                    },]}>
                <Rate/>
                </Form.Item>
                <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={ 
                           (!form.isFieldsTouched(["consumerName"]) || !form.isFieldsTouched(["consumerEmail"]) || !form.isFieldsTouched(["rating"])) ||
                           form.getFieldsError().filter(({errors}) => errors.length).length
                        }
                    >
                        Enviar
                    </Button>
                )}
                 </Form.Item>
                 </Form>

            </Modal>
            </div>

    )
}
export default ModalRate