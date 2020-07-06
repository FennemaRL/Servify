import React, {useEffect, useState} from 'react';
import {Button, message, Form, Input,Row, Col} from 'antd';
import axios from "axios";
import Question from '../question'


function QuestionComponent({questionsback, serviceName, providerName}){
    const  [questions, setQuestions] = useState([]);
    const addQuestion  = question => {
        setQuestions(prevsquest=> [question,...prevsquest])
    }
    useEffect(()=>{
        setQuestions(prevsquest=> [...prevsquest,...questionsback])
    },[questionsback])

    return (
        <div style={{marginTop:'2vh'}}>
            <p>Realiza una pregunta:</p>
            <div style={{ padding:'3vh', }}>
                <QuestionForm serviceName={serviceName} providerName={providerName} addQuestion={addQuestion}/>
            </div>
            <div className="containerList" >
                {questions.map( question =>(
                  <Question {...question} key={question.id} providerName={providerName}/>
                  ))}
            </div>
        </div>
    );
  }



const QuestionForm = ({providerName,serviceName, addQuestion}) => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    useEffect(() => {
      forceUpdate({});
    }, []);
  
    const onFinish = values => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/question`, 
        {
                providerName : providerName,
                serviceCategory: serviceName,
                ...values
        }, 
        )
            .then(() => {
                message.success("se agrego la pregunta con exito")
                form.setFieldsValue({question:''})
            })
            .catch(err => {
                message.error(err.response.data +" se recargara la pagina")
                setTimeout(() => window.location.reload(true), 700)
            })
        addQuestion({ providerName : providerName,
            serviceCategory: serviceName,
            ...values, id:Date.now.toString})
    }
    return (
      <Form form={form} name="horizontal" layout="inline" onFinish={onFinish} >
          <Row gutter={[24, 8]}>
          <Col span={12} >
        <Form.Item
          name="consumerName"
          rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
        >
          <Input placeholder="Ingrese su nombre" />
        </Form.Item>
        </Col>
        <Col span={12} >
        <Form.Item
          name="consumerEmail"
          rules={[{ required: true, message: 'Por favor ingrese su mail!' }]}
        >
          <Input placeholder="Ingrese su mail" />
        </Form.Item>
        </Col>
        <Col span={24} >
        <Form.Item
          name="question"
          rules={[{ required: true, message: 'Porfavor ingrese su pregunta' }]}
        >
          <Input.TextArea placeholder="Ingrese su pregunta"  autoSize={ {minRows: 2, maxRows: 4}}/>
        </Form.Item>
        </Col>
        <Col span={8} >
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length || 150 < (form.getFieldsValue().question ? form.getFieldsValue().question.length : 0) 
              }
            >
              Enviar
            </Button>
          )}
        </Form.Item>
        </Col>
        </Row>
      </Form>
    );
  };
  export default QuestionComponent