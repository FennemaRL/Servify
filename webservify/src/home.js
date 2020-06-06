import React,{useState, useEffect, } from 'react';
import axios from 'axios';
import { Typography, Card, Col, Row } from 'antd';

const { Title, Paragraph } = Typography;
const {Meta} = Card;
function Servicios() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    axios.get('http://localhost:8080/api/categories')
      .then(res=>setCategories(res.data))
      .catch(err=>console.error(err))
  },[]);

    return (
    <div>
        <Title  level={3} style={{textAlign:'center'}}>Servicios</Title>
            <Row gutter={[40, 16]} justify="center">
            {categories.map((cat,indx)=>(
                <Col xs={10} md={4} key={indx}>
                    <Card hoverable onClick={console.log('hacer click a llamado a la api')} style={{ width: 150, }} cover={<img alt={cat.name} style={{ height: 130}} src={cat.url} />}>
                        <Meta title={cat.name}/>
                    </Card>
                </Col>
                ))
            }
            </Row>
    </div>
    )
}

function Home () {
    return (  
        <div style={{display:'flex',flexDirection:'column',minHeight:'60vh',alignItems:'center', }}>
            <Title  level={2}>Sobre Nosotros</Title>
            <Paragraph ellipsis>Somos un sitio que nacio por la necesitad de conectar personas que buscan algun tipo de 
                                servicio con aquellas que lo brindan.
            </Paragraph>
            <Servicios/>
        </div>) 
}




export default  Home ;