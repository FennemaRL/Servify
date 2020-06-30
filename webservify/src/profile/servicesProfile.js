import React, {useEffect, useState} from 'react';
import {Button, Cascader, Tabs, Typography,  message, /*Tooltip,*/ Comment, Form, Input,Row, Col} from 'antd';
import axios from "axios";
import {FormEditService, Service} from "./contentServiceProfile";
import {Redirect} from 'react-router-dom';
import {categories} from '../catAndScopes'
import {GetToken} from '../login/auth'
import Rating from './serviceConsumerViewComponents/rating'
import ViewZones from './serviceConsumerViewComponents/viewZones'
import ShowCalifications from './serviceConsumerViewComponents/showCalifications'
import ZonesEditable from './serviceProviderViewComponents/zonesEditable'

//import {  LikeOutlined, LikeFilled } from '@ant-design/icons';
const {Title} = Typography;
const {TabPane} = Tabs;


export function ViewEditableService({username, providerSevices, setproviderSevices, err}) {

    const [selectCategory, setselectCategory] = useState();
    const [activeCategory, setActiveCategorie] = useState();
 
    useEffect(() => {
        setActiveCategorie(providerSevices[0] ? providerSevices[0].categoryName : null)
    }, [providerSevices])

    const onChange = categorie => setselectCategory(categorie);

    const add = () => {
        if (selectCategory[0] && providerSevices.filter(ser => ser.category.categoryName === selectCategory[0]).length) {
            return alert("ya brindas ese servicio")
        }
        if (selectCategory[0]) {
            setproviderSevices(prevCate => [...prevCate, {category: {categoryName: selectCategory[0]}}])
            setActiveCategorie(selectCategory)
            axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service`, 
            {
                    username: username,
                    category: selectCategory[0]
            }, 
            {headers:{
                'token': 'Bearer ' + GetToken()
            }})
                .then(() => {
                    message.success("se agrego el servicio "+selectCategory[0]+" con exito")
                })
                .catch(err => {
                    message.error(err.response.data +" se recargara la pagina")
                })
        }
    }
    const remove = targetKey => {
        setproviderSevices(prevSer =>
            [...prevSer].filter(ser => ser.category.categoryName !== targetKey))
        setActiveCategorie(providerSevices[0].category ? providerSevices[0].category.categoryName : null)

        axios.delete(`${process.env.REACT_APP_API_URL}/api/provider/service`, {
            data: {
                username: username,
                category: targetKey
            },
            headers:{
                'token': 'Bearer ' + GetToken()
            }
        })
            .then(() => {
                message.success("se borro el servicio " +targetKey+" con exito")
            })
            .catch(err => {
                message.error(err.response.data +" se recargara la pagina")
            })
    }
    const onEdit = (targetKey, action) => action === 'add' ? add(targetKey) : remove(targetKey);
    const operations = <div style={{display:'flex'}}><Cascader options={categories} onChange={onChange} style={{width:140}}
                                      placeholder="Seleccione Una categoria"/><Button type="primary"
                                                                                      onClick={add}>add</Button></div>
    const onChangeTab = key => setActiveCategorie(key);
   
    return (<>{ (err && <Redirect to={{
        pathname: "/Servify/error",
        state: { message: err }
    }} /> ) ||
    <div className='catOfferSize' >
            <Title style={{textAlign:'center'}} level={4}>Categorias ofrecidas</Title>
            <div className="card-container" >
                <Tabs tabBarExtraContent={operations} type="editable-card" style={{minHeight:"70vh"}}
                      onChange={onChangeTab}
                      activeKey={activeCategory}
                      onEdit={onEdit}
                      hideAdd>
                          
                    {providerSevices.map(ser => (
                        <TabPane tab={ser.category.categoryName} key={ser.category.categoryName} closable={true} >
                            <FormEditService username={username} service={ser} />
                            <ZonesEditable name={username} service={ser}/>
                        </TabPane>))}
                </Tabs>
        </div>
    </div>
    }
    </>)

}


export function ViewService({username, providerSevices, category, err}) {

    const [activeCategory, setActiveCategorie] = useState();
    const onChangeTab = key => setActiveCategorie(key);
    useEffect(() => {
        setActiveCategorie(category ? category : providerSevices[0] ? providerSevices[0].categoryName : null)
    }, [providerSevices, category])

    return (<>{(err && <Redirect to={{
            pathname: '/Servify/Error',
            state: {message: err}
        }}/>) ||
        <div style={{width: '70vw'}}>
            <Title style={{textAlign: 'center'}} level={4}>Categorias ofrecidas</Title>
            <div className="card-container">
                <Tabs type="editable-card"
                      activeKey={activeCategory}
                      onChange={onChangeTab}
                      hideAdd>
                    {providerSevices.map(ser => (
                        <TabPane tab={ser.category.categoryName} key={ser.category.categoryName} closable={false}>
                            <div>
                                <Service username={username} service={ser}/>
                                <Rating service={ser} serviceName={ser.category.categoryName} username={username}/>
                                <ShowCalifications califications={ser.califications}/>
                                <ViewZones service={ser}/>  
                                <QuestionComponent questionsback={ ser.questions} serviceName={ser.category.categoryName} providerName={username} />
                                                   
                            </div>
                        </TabPane>))
                        }
                </Tabs>
            </div>
        </div>
        }
        </>
    )
}
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
            <p>Realiza una pregunta</p>
            <div  style={{ marginLeft:"6.5vw", marginRight:"6.5vw", marginTop:"1vh"}}>
                <QuestionForm serviceName={serviceName} providerName={providerName} addQuestion={addQuestion}/>
                <div  style={{backgroundColor:"#F7F9FC", maxHeight:"20vh", overflowY:"scroll", marginTop:"1vh"}}>
        
                    {questions.map( question =>(
                        <Question {...question} key={question.id} providerName={providerName}/>
                    ))}
                </div>
            </div>
        </div>
    );
  }

const Question  = ({question, consumerName,  providerName, response}) => {
    return(
        <Comment   author={<p>{consumerName}</p>}  content={<p>{question}</p>}>
            {response &&  <Comment author={<p>{providerName}</p>}  content={<p>{response}</p>}/>}
        </Comment>
    )
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