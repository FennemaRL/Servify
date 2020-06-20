import React, { useEffect } from 'react';
import { ViewEditableService, ViewService, } from "./servicesProfile";
import { useProvider } from "./useProviderServices";
import { Descriptions, Typography} from 'antd';
import { Form, Input, Button,message } from 'antd';
import axios from 'axios';

const { Title, } = Typography;

function ProfileInfoEditable({personalInfo}){

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
        originalName : personalInfo.providerName,
        newName : values.username,
        newPhoneNmbr : values.phoneNmbr,
        newCellPhoneNmbr : values.celPhoneNmbr,
        newWebPage : values.webPage,
        newResidence : values.residence   
  },{
  headers:{
      'token': 'Bearer ' + localStorage.getItem("tokenUser")
  } }).then(res => {
    message.success("Se modifico al informacion personal con exito");
    }).catch( err => {
      message.error(err);
    });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  useEffect( () => {
     
      formRef.current.setFieldsValue({username: personalInfo.providerName, phoneNmbr: personalInfo.phoneNumber,
         celPhoneNmbr: personalInfo.cellNumber, webPage: personalInfo.webPage, residence: personalInfo.residence});
  }, [formRef, personalInfo]);

  return (
    <div>
    <Title style={{textAlign:'center'}} level={4}>Informacion Personal</Title>
    <Form className='formEditableInfo'
        ref = {formRef}
        {...layout}
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Nombre"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefono"
        name="phoneNmbr"
        rules={[
          {
            required: true, 
            message: 'Please input your phone number'
          },
        ]}
      >
        <Input type = "number"/>
      </Form.Item>

      <Form.Item
        label="Celular"
        name="celPhoneNmbr"
        rules={[
          {
            required: true,
            message: 'Please input your celphone number',
          },
        ]}
      >
        <Input type = "number"/>
      </Form.Item>

      <Form.Item
        label="Pagina Web"
        name="webPage"
        rules={[
          {
            required: true,
            message: 'Please input your phone web page!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Localidad"
        name="residence"
        rules={[
          {
            required: true,
            message: 'Please input your phone residence!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Guardar Cambios
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

function ProfileInfoView({personalInfo}){
    return(<div style={{width:'70vw'}}>
        <Descriptions title={<Title style={{textAlign:'center'}} level={4}>Informacion Personal</Title>}  >
            <Descriptions.Item label="Nombre"> {personalInfo.providerName} </Descriptions.Item>
            <Descriptions.Item label="Número de celular"> {personalInfo.cellNumber ? personalInfo.cellNumber: "Este usuario no cuenta con número de celular"} </Descriptions.Item>
            <Descriptions.Item label="Número de telefono"> {personalInfo.phoneNumber ? personalInfo.phoneNumber: "Este usuario no cuenta con número de teléfono"}</Descriptions.Item>
             <Descriptions.Item label="Sitio Web">{personalInfo.webPage ? personalInfo.webPage: "Este usuario no cuenta con sitio web"}</Descriptions.Item>
             <Descriptions.Item label="Residencia"> {personalInfo.residence ? personalInfo.residence: "Este usuario no cuenta con una localidad"}</Descriptions.Item>
        </Descriptions>
    </div>)
    
}

export function ProfileEditable(){
    return <Profile ComponentViewService={ViewEditableService} ComponentViewProfileInfo={ProfileInfoEditable}/>
}
export function ConsumerView(){
    return <Profile ComponentViewService={ViewService} ComponentViewProfileInfo={ProfileInfoView} />
}

const Profile = ({ComponentViewService, ComponentViewProfileInfo}) => {
    let data = useProvider();
    return (
        <div style={{display: 'flex', minHeight: '70vh', flexDirection: 'column',  alignItems: 'center', justifyContent: 'center'}}>
                <ComponentViewProfileInfo {...data} />
                <div style={{marginTop:'7vh'}}/>
                <ComponentViewService {...data} />
        </div>
    );
}
