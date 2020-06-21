import React, {useEffect, useState} from 'react';
import {Button, Cascader, message, Rate, Tabs, Typography} from 'antd';
import axios from "axios";
import {FormEditService, Service} from "./contentServiceProfile";
import {Redirect} from 'react-router-dom';

const {Title, Paragraph} = Typography;
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
            axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service`, 
            {
                    username: username,
                    category: selectCategory[0]
            }, 
            {headers:{
                'token': 'Bearer ' + localStorage.getItem("tokenUser")
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
                'token': 'Bearer ' + localStorage.getItem("tokenUser")
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
                            <div style={{display: "flex"}}>
                                <Service username={username} service={ser}/>
                                <Rating service={ser} serviceName={ser.category.categoryName} username={username}/>
                            </div>
                        </TabPane>))}
                </Tabs>
            </div>
        </div>
        }
        </>
    )
}

function Rating({serviceName, username, service}) {

    const [visible, setVisible] = useState(false);
    const [averageRating, setAverageRating] = useState(0);

    const calificate = (value) => {
        setVisible(false)
        axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/calification`,
            {
                "providerName": username,
                "serviceCategory": serviceName,
                "calificationValue": value
            }).then(res => {
                message.success('This is a success message');
                setTimeout(() => window.location.reload(true), 700)
            }
        ).catch(err => console.log(err.response.data))
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = e => {
        setVisible(false);
    };

    const handleCancel = e => {
        setVisible(false);
    };

    return (
        <div style={{display: "flex", flexdirection: "row"}}>
            {/*            <Button type="primary" onClick={showModal}>
                Calificar
            </Button>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Rate onChange={calificate}/>
            </Modal>*/}
            <div>
                {/*<Statistic title="Calificación promedio" value={service.calificationAverage} suffix="/5"/>*/}
                <Rate defaultValue={service.calificationAverage} onChange={calificate}/>
            </div>
        </div>
    );

}