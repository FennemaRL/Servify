import React,{useState, useEffect, } from 'react';
import axios from 'axios';
import { Typography, Card, Col, Row } from 'antd';
import { NavLink } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const {Meta} = Card;
function Servicios() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then(res=>setCategories(res.data))
      .catch(err=>console.error(err))
  },[]);

    return (
    <div>
        <Title  level={3} style={{textAlign:'center'}}>Servicios</Title>
            <Row gutter={[40, 16]} justify="center">
            {categories.map((cat,indx)=>(
                serviceCategory(indx, cat)
                ))
            }
            </Row>
    </div>
    )

    function serviceCategory(indx, cat) {
        return <Col xs={10} md={4} key={indx}>
            <NavLink to={`/Servify/search/${cat.categoryName}`}>
                <Card hoverable style={{ width: 150 }} cover={<img alt={cat.categoryName} style={{ height: 130 }} src={cat.imageURL} />}>
                    <Meta title={cat.categoryName} />
                </Card>
            </NavLink>
        </Col>;
    }
}

function Home () {
    return (  
        <div style={{display:'flex',flexDirection:'column',minHeight:'60vh',alignItems:'center', }}>
            <Title  level={2}>Sobre Nosotros</Title>
            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>Somos un sitio que nació por la necesitad de conectar personas que buscan algun tipo de 
                                servicio con aquellas que lo brindan.
            </Paragraph>
            <Servicios/>
        </div>) 
}




export default  Home ;