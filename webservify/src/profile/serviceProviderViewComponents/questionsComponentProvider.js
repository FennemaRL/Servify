import React, {useEffect, useState} from 'react';
import {Button, message, Modal, Form, Input,} from 'antd';
import Question from '../question'
import axios from 'axios';
import {GetToken} from '../../login/auth'
export default function QuestionsProvider ({questionsback, providerName, serviceName}) {
    const  [questions, setQuestions] = useState([]);
    const  [visible, setVisible] = useState(false);
    const  [selectedQuestion, setSelectedQuestion] = useState(-1);
    useEffect(()=>{
        let withResponse = questionsback.filter(q=>!!q.answer)
        let withoutResponse = questionsback.filter(q=>!q.answer)
        setQuestions([...withoutResponse,...withResponse])
    },[questionsback])

    const responsequestion= (values)=>{
       
        if(questions[selectedQuestion]){
            setQuestions(prev =>{
                let mod = [...prev]
                let q= mod[selectedQuestion]
                q.answer=values.answer
                return mod
            }
        )
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/questionAnswer`, 
        {
                ...values,
                providerName,
                serviceCategory:serviceName,
                question:questions[selectedQuestion].question
        }, 
        {headers:{
            'token': 'Bearer ' + GetToken()
        }})
            .then(() => {
                message.success("se respondio la pregunta con exito")
            })
            .catch(err => {
                message.error(err.response.data +" se recargara la pagina")
                setTimeout(() => window.location.reload(true), 700)
            })
        }
        setVisible(false)

    }
    const openModal= (indx)=>{
        setSelectedQuestion(indx)
        setVisible(true)
    }
    const actions = (question,indx)=>[
      <span onClick={ ()=>openModal(question,indx)} key="comment-basic-reply-to">Reply to</span>,
    ];
  
    return (
        <div style={{marginTop:'2vh'}}> 
            <p>Lista de preguntas pregunta</p>
            <Modal visible={visible}  onCancel={ ()=>setVisible(false)} footer={null} title={<p style={{textAlign:'center'}}>{ questions[selectedQuestion] ? questions[selectedQuestion].consumerName : undefined}</p>}>
                <p style={{textAlign:'center'}}>{questions[selectedQuestion]?questions[selectedQuestion].question:undefined}</p>
                <FormResponse onFinish={responsequestion}/>
            </Modal>
            <div  className="containerList">
            {questions.map( (question,indx)=>(
                    <Question {...question} key={question.id} providerName={providerName} actions={question.answer ? undefined : actions(indx)} />
            ))}
            </div>
        </div>
    );
  };


  const FormResponse = ({onFinish})=>{
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    useEffect(() => {
        forceUpdate({});
      }, []);

    const resetvalue = values => {
        onFinish(values)
        form.setFieldsValue({answer: undefined})

    }
      return (
        <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={resetvalue}
      >
        <Form.Item
          label="Respuesta"
          name="answer"
          rules={[{ required: true, message: 'Ingrese su respuesta!' }]}
        >
          <Input.TextArea autoSize={ {minRows: 2, maxRows: 4}}/>
        </Form.Item>
  
        <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length || 150 < (form.getFieldsValue().answer ? form.getFieldsValue().answer.length : 0)
            }
          >
            Responder
          </Button>
        )}
      </Form.Item>
      </Form>
      )
  }