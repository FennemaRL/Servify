import React, {useEffect, useState} from 'react';
import {Button, Cascader, Tabs, Rate, Typography, Select, message, Tag, Modal, Form, Input, List} from 'antd';
import axios from "axios";
import {FormEditService, Service} from "./contentServiceProfile";
import {Redirect} from 'react-router-dom';
import {categories, scopes} from '../catAndScopes'
import {GetToken} from '../login/auth'

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

function ZonesEditable({name, service}){
    const [zones, setzones] = useState([]) 
    const { Option } = Select;
    const children = [];
    const filteredOptions = scopes.filter(o => !zones.includes(o));
    scopes.map(zone => children.push(<Option key={zone}>{zone}</Option>))

    useEffect(() => {
        if(service.scopes) setzones(service.scopes.map(scope => scope.scope))
    }, [service])

    const onSend = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/provider/service/scope`, {
            providerName: name,
            serviceCategory: service.category.categoryName,
            scopes: zones
        }).then(() => {
            message.success("Se modificaron las zonas de alcance con éxito")
        })
        .catch(err => {
            message.error(err.response.data)
        })
    };

    function handleChange(values) {setzones(values);}
        return (
            <div styles={{display:"flex"}}>
            <p style={{textAlign:'left',marginTop:"2vh", marginBottom: "1vh"}} >Zonas de alcance:</p>
            <Select
                mode="multiple"
                style={{ width: '55%', marginRight:"1vw"}}
                placeholder="Por favor seleccione una zona"
                value={zones}
                onChange={handleChange}>
                {filteredOptions.map(zone => <Option key={zone}>{zone}</Option>)}
            </Select>
            <Button type="primary" onClick={onSend}>
                Guardar
            </Button>
            </div>)
}


///Non editable
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
                    {providerSevices.map(ser => { console.log(ser); return (
                        <TabPane tab={ser.category.categoryName} key={ser.category.categoryName} closable={false}>
                            <div>
                                <Service username={username} service={ser}/>
                                <Rating service={ser} serviceName={ser.category.categoryName} username={username}/>
                                <ShowCalifications califications={ser.califications}/>
                                <ViewZones service={ser}/>                          
                            </div>
                        </TabPane>)})
                        }
                </Tabs>
            </div>
        </div>
        }
        </>
    )
}

function ViewZones({service}){
    return  (
        <div styles={{display:"flex"}}>
            <p style={{textAlign:'left',marginTop:"2vh", marginBottom: "1vh"}} >Zonas de alcance:</p>
            {service.scopes.map(scope => <Tag key={scope.scope}>{scope.scope}</Tag>)}
        </div>
    )  
}

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

function ShowCalifications({califications}){
    return(
    <div>
        <div style={{backgroundColor:"#F7F9FC", maxHeight:"20vh", overflowY:"scroll", marginLeft:"6.5vw", marginRight:"6.5vw"}}>
        <List
        bordered= {true}
        itemLayout="horizontal"
        dataSource={califications}
        renderItem={calification => (
          <List.Item>
            <List.Item.Meta
              title={<div> 
                   <p>{calification.consumer.name}</p>            
                  <Rate allowHalf disabled defaultValue={calification.calificationValue}/>
                  </div>}
                    description={calification.message}/>
          </List.Item>
        )}
      />
        </div>
    </div>
    )
}

function Rating({serviceName, username, service}) {
    return (
        <div style={{display: "flex", flexdirection: "row", alignItems: "center", marginTop:"2vh", marginBottom:"1vw"}}>
                <p>Calificación: </p>
                <Rate style={{marginLeft:"1vw"}} disabled defaultValue={service.calificationAverage}/>
                <ModalRate serviceName={service.category.categoryName} username={username}/>

        </div>
    );
}