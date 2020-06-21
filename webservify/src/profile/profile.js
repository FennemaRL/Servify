import React, {useEffect} from 'react';
import {ViewEditableService, ViewService,} from "./servicesProfile";
import {useProvider} from "./useProviderServices";
import {Button, Descriptions, Form, Input, message, Typography} from 'antd';
import axios from 'axios';

const {Title,} = Typography;

function ProfileInfoEditable({personalInfo}) {

    const formRef = React.createRef();

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
        axios.put(`${process.env.REACT_APP_API_URL}/api/provider`, {
            originalName: personalInfo.providerName,
            newName: values.username,
            newPhoneNmbr: values.phoneNmbr,
            newCellPhoneNmbr: values.celPhoneNmbr,
            newWebPage: values.webPage,
            newResidence: values.residence
        }, {
            headers: {
                'token': 'Bearer ' + localStorage.getItem("tokenUser")
            }
        }).then(() => {
            message.success("Se modifico al informacion personal con exito");
        }).catch(err => {
            message.error(err);
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {

        formRef.current.setFieldsValue({
            username: personalInfo.providerName, phoneNmbr: personalInfo.phoneNumber,
            celPhoneNmbr: personalInfo.cellNumber, webPage: personalInfo.webPage, residence: personalInfo.residence
        });
    }, [formRef, personalInfo]);

    function itemProfileInfo(label, name, rules, type) {
        return <Form.Item
            label={label}
            name={name}
            rules={rules}
        >
            <Input type={type}/>
        </Form.Item>;
    }

    return (
        <div>
            <Title style={{textAlign: 'center'}} level={4}>Informacion Personal</Title>
            <Form className='formEditableInfo'
                  ref={formRef}
                  {...layout}
                  name="basic"
                  initialValues={{
                      remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
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
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Guardar Cambios
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

function ProfileInfoView({personalInfo}) {
    return (<div style={{width: '70vw'}}>
        <Descriptions title={<Title style={{textAlign: 'center'}} level={4}>Informacion Personal</Title>}>
            <Descriptions.Item label="Nombre"> {personalInfo.providerName} </Descriptions.Item>
            <Descriptions.Item
                label="Número de celular"> {personalInfo.cellNumber ? personalInfo.cellNumber : "Este usuario no cuenta con número de celular"} </Descriptions.Item>
            <Descriptions.Item
                label="Número de telefono"> {personalInfo.phoneNumber ? personalInfo.phoneNumber : "Este usuario no cuenta con número de teléfono"}</Descriptions.Item>
            <Descriptions.Item
                label="Sitio Web">{personalInfo.webPage ? personalInfo.webPage : "Este usuario no cuenta con sitio web"}</Descriptions.Item>
            <Descriptions.Item
                label="Residencia"> {personalInfo.residence ? personalInfo.residence : "Este usuario no cuenta con una localidad"}</Descriptions.Item>
        </Descriptions>
    </div>)

}

export function ProfileEditable() {
    return <Profile ComponentViewService={ViewEditableService} ComponentViewProfileInfo={ProfileInfoEditable}/>
}

export function ConsumerView() {
    return <Profile ComponentViewService={ViewService} ComponentViewProfileInfo={ProfileInfoView}/>
}

const Profile = ({ComponentViewService, ComponentViewProfileInfo}) => {
    let data = useProvider();
    return (
        <div style={{
            display: 'flex',
            minHeight: '70vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ComponentViewProfileInfo {...data} />
            <div style={{marginTop: '7vh'}}/>
            <ComponentViewService {...data} />
        </div>
    );
}
