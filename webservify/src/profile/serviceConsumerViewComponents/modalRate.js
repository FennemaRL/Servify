import React, {useState} from 'react';
import {Button, Form, Input, message, Modal, Rate} from 'antd';
import axios from "axios";


function ModalRate({serviceName, username, addCalification, addIdCalification}){
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm()

    const calificate = (value) => {
        setVisible(false)
        addCalification(serviceName, {
            "providerName": username,
            "serviceCategory": serviceName,
            "calificationValue": value.rating,
            "message": value.comment,
            "consumerName": value.consumerName,
            "consumerEmail": value.consumerEmail

        })
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/calification`,
            {
                "providerName": username,
                "serviceCategory": serviceName,
                "calificationValue": value.rating,
                "message": value.comment,
                "consumerName": value.consumerName,
                "consumerEmail": value.consumerEmail

            }).then(res => {message.success('This is a success message' )
                    addIdCalification(serviceName, value.consumerName, value.consumerEmail, value.comment, res.data.id)
        } 
            
        ).catch(err => {
            message.error(err.response.data + ' se recargara la pagina')
            setTimeout(() => window.location.reload(true), 700)
        })
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    function simpleFormItem(label, name, rules) {
        return <Form.Item
            label={label}
            name={name}
            rules={rules}
        >
            <Input/>
        </Form.Item>;
    }

    return (
        <div style={{display: "flex", flexdirection: "row", alignItems: "center", marginTop: "1vh"}}>
            <Button type="primary" onClick={showModal}>
                Calificar
            </Button>
            <Modal
                title="Califica"
                visible={visible}
                onCancel={handleCancel}
                footer={null}>

                <       Form form={form} onFinish={calificate}>
                    {simpleFormItem("Nombre y Apellido", "consumerName", [{
                        required: true,
                        message: 'Por favor completa con tu nombre completo',
                    },])}
                    {simpleFormItem("Correo electrónico", "consumerEmail", [{
                        required: true,
                        message: 'Por favor completa con tu correo electrónico',
                    },])}
                    <Form.Item name="comment" label="Escribí tu opinión">
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item
                        name="rating"
                        label="Seleccioná un puntaje"
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