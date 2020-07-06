import React, {useState, useEffect,} from 'react';
import axios from 'axios';
import {Typography, Card, Col, Row, Tag, Tooltip} from 'antd';
import {NavLink} from 'react-router-dom';
import Avatar from "antd/es/avatar";
import List from "antd/es/list";
import Rate from "antd/es/rate";

const {Title, Paragraph} = Typography;
const {Meta} = Card;

function Servicios() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
            .then(res => setCategories(res.data))
            .catch(err => console.error(err))
    }, []);

    return (
        <div style={{width: '90vw'}}>
            <Title level={3} style={{textAlign: 'center'}}>Servicios</Title>
            <Row gutter={[24, 16]} justify="space-around">
                {categories.map((cat, indx) => (
                    serviceCategory(indx, cat)
                ))
                }
            </Row>
        </div>
    )

    function serviceCategory(indx, cat) {
        return <Col ms={12} lg={8} xl={4} key={indx}>
            <NavLink to={`/Servify/search/${cat.categoryName}`}>
                <Card hoverable className='cardResize' cover={<img alt={cat.categoryName} src={cat.imageURL}/>}>
                    <Meta title={cat.categoryName}/>
                </Card>
            </NavLink>
        </Col>;
    }
}

function BestProviders() {
    const [bestProviders, setBestProviders] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/providers/bestRated`)
            .then(res => {
                setBestProviders(res.data)
            })
            .catch(err => console.error(err))
    }, []);

    return (
        <div>
            <Title level={3} style={{textAlign: 'center'}}>Prestadores recomendados</Title>
            <List
                itemLayout="horizontal"
                dataSource={bestProviders}
                renderItem={provider => (
                    <NavLink to={`/Servify/view/${provider.username}`}>
                        <List.Item>
                            <List.Item.Meta
                                title={<p style={{paddingLeft:5}}>{provider.username}</p>}
                                description={
                                    <div >
                                        <div style={{ paddingLeft:15,
                                            display: "flex"}}>
                                        <Tooltip title={"promedio de "+provider.averageRating+" entre "+provider.services.length+" servicios"} ><div ><Rate allowHalf disabled defaultValue={provider.averageRating}/></div></Tooltip> </div>
                                        <div style={{
                                            display: "flex", flexDirection: "row", justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            {provider.services.map(s => <Tag key={s.category.categoryName}>
                                                {s.category.categoryName}</Tag>)}
                                                
                                        </div>
                                        <hr style={{border:'0.5px solid #bfbfbf'}}/>
                                    </div>
                                }
                            />
                        </List.Item>
                    </NavLink>

                )}
            />
        </div>)
}

function Home() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '80vh',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Title level={2}>Sobre Nosotros</Title>
            <Paragraph ellipsis={{rows: 2, expandable: true, symbol: 'more'}}>Somos un sitio que nació por la necesitad
                de conectar personas que buscan algun tipo de
                servicio con aquellas que lo brindan.
            </Paragraph>
            <div style={{marginTop: '10vh'}}/>
            <Servicios/>
            <BestProviders/>
        </div>)
}


export default Home;