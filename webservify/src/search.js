import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Avatar, List, Typography} from 'antd';
import axios from "axios";

const {Title} = Typography;

function Search() {
    let {category} = useParams();
    const [providers, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/services/${category}`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => console.error(err))
    }, [category]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Title style={{textAlign: 'center'}} level={2}>Búsqueda {category}</Title>
            <div style={{backgroundColor:'#d9d9d9', width:'45vw'}}>
            <List itemLayout="horizontal" dataSource={providers} size='large' renderItem={item => (
                <List.Item style={{backgroundColor: '#d9d9d9', borderRadius: 5}}>
                    <NavLink to={`/Servify/view/${item.username}/${category}`}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<p>{item.username}</p>}
                            description={item.description ? item.description : "No contiene descripcion"}
                        />
                    </NavLink>
                </List.Item>
            )}
            />

  </div>
        </div>)
}

export default Search