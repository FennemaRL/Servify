import React, {useEffect, useState} from 'react';
import {Button, Cascader, Tabs,Typography} from 'antd';
import axios from "axios";
import { FormEditService, Service } from "./contentServiceProfile";
import { Redirect } from 'react-router-dom';
import { Rate } from 'antd';
import { Modal} from 'antd';

const { Title, Paragraph } = Typography;
const {TabPane} = Tabs;
const categories = [
    {value: "Plomeria", label: " Plomeria"},
    {value: "Electricidad", label: "Electricidad"},
    {value: "Mecanica", label: "Mecanica"},
    {value: "Carpinteria", label: "Carpinteria"},
    {value: "Gas Natural", label: "Gas Natural"},
];


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
            axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service`, {
                username: username,
                category: selectCategory[0]
            })
                .then(() => {
                    alert("se agrego con exito")
                })
                .catch(err => {
                    alert(err.response.data)
                    window.location.reload();
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
            }
        })
            .then(() => {
                alert("se borro con exito")
            })
            .catch(err => {
                alert(err.response.data.message)
                window.location.reload();
            })
    }
    const onEdit = (targetKey, action) => action === 'add' ? add(targetKey) : remove(targetKey);
    const operations = <div><Cascader options={categories} onChange={onChange}
                                      placeholder="Seleccione Una categoria"/><Button type="primary"
                                                                                      onClick={add}>add</Button></div>
    const onChangeTab = key => setActiveCategorie(key);

    return (<>{ (err && <Redirect to={{
        pathname: '/Servify/Error',
        state: { message: err }
    }} /> ) ||
    <div style={{width: '70vw'}}>
            <Title style={{textAlign:'center'}} level={4}>Categorias ofrecidas</Title>
            <div className="card-container">
                <Tabs tabBarExtraContent={operations} type="editable-card"
                      onChange={onChangeTab}
                      activeKey={activeCategory}
                      onEdit={onEdit}
                      hideAdd>
                    {providerSevices.map(ser => (
                        <TabPane tab={ser.category.categoryName} key={ser.category.categoryName} closable={true}>
                            <FormEditService username={username} service={ser}/>
                        </TabPane>))}
                </Tabs>
            
        </div>
    </div>
    }
    </>)
   
}

///Non editable
export function ViewService({username, providerSevices, category, err}) {
    
    const [activeCategory, setActiveCategorie] = useState();
    const onChangeTab = key => setActiveCategorie(key);
    useEffect(() => {
        setActiveCategorie(category? category: providerSevices[0] ? providerSevices[0].categoryName : null)
    }, [providerSevices,category])

    return  (<>{ (err && <Redirect to={{
        pathname: '/Servify/Error',
        state: { message: err }
    }} /> ) ||
        <div style={{width: '70vw'}}>
           <Title style={{textAlign:'center'}} level={4}>Categorias ofrecidas</Title>
            <div className="card-container">
                <Tabs type="editable-card"
                      activeKey={activeCategory}
                      onChange={onChangeTab}
                      hideAdd>
                    {providerSevices.map(ser => (
                        <TabPane tab={ser.category.categoryName} key={ser.category.categoryName} closable={false}>
                            <Rating serviceName={ser.category.categoryName} username={username}/>
                            <Service username={username} service={ser}/>
                        </TabPane>))}
                </Tabs>
            </div>
        </div>
        }
    </>
    )
}

function Rating({serviceName, username}){

    const [visible, setVisible] = useState(false);

    const calificate = (value) => 
    {
        setVisible(false)    
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/calification`, 
    {
    "providerName": username,
    "serviceCategory": serviceName,
    "calificationValue": value
    }).then( res => {
        alert(res.data);
    }
    ).catch(err => console.log(err.response.data))}

        const showModal = () => {
          setVisible(true);
        };
      
        const handleOk = e => {
          console.log(e);
          setVisible(false);
        };
      
        const handleCancel = e => {
          console.log(e);
          setVisible(false);
        };
      
        return (
            <div>
              <Button type="primary" onClick={showModal}>
                Calificá
              </Button>
              <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Rate onChange = {calificate} />
              </Modal>
            </div>
          );
        
}