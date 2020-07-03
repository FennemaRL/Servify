import React, {useEffect, useState} from 'react';
import {NavLink, Redirect, useParams} from "react-router-dom";
import {Avatar, List, Typography} from 'antd';
import axios from "axios";
import Menu from "antd/es/menu";
import Dropdown from "antd/es/dropdown";
import {DownOutlined} from '@ant-design/icons';

const {Title} = Typography;

function Search() {
    const {category, zone} = useParams();
    const [providers, setCategories] = useState([]);
    const [err, seterr] = useState();
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="ratings_desc" onClick={sortByAverage}>
                    Mejor rating
                </a>
            </Menu.Item>
        </Menu>
    );
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/services/${category}`, {params: {scope: zone}})
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => seterr(err.response.data))
    }, [category, zone]);

    function sortByAverage() {
        setCategories(
            [...providers].sort((a, b) => {
                return (a.average < b.average) ? 1 : -1
            }))
    }

    function orderByDropdown() {
        let areProviders = providers.length >= 1;
        return <Dropdown overlay={menu} disabled={!areProviders}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Ordenar por <DownOutlined/>
            </a>
        </Dropdown>;
    }

    function listOfProviders() {
        return <List itemLayout="horizontal" dataSource={providers} size='large' renderItem={item => {
            const noContieneDescripcion = "No contiene descripción";
            return (
                <List.Item style={{backgroundColor: '#d9d9d9', borderRadius: 5}}>
                    <NavLink to={`/Servify/view/${item.username}/${category}`}>
                        <List.Item.Meta
                            avatar={<Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={<p>{item.username}</p>}
                            description={item.description ? item.description : noContieneDescripcion}
                        />
                    </NavLink>
                </List.Item>
            );
        }}
        />;
    }

    function searchTitle() {
        return <>
            <Title style={{textAlign: 'center'}} level={2}>Búsqueda de {category}</Title>
            {zone && <Title style={{textAlign: 'center'}} level={4}>en zona {zone}</Title>}
        </>;
    }

    return (
        <>{(err && <Redirect to={{
            pathname: '/Servify/Error',
            state: {message: err}
        }}/>) ||
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {searchTitle()}
            <div style={{width: 441, height: 50}}>
                {orderByDropdown()}
            </div>
            <div style={{backgroundColor: '#d9d9d9', width: '45vw'}}>
                {listOfProviders()}
            </div>
        </div>
        }
        </>
    )
}

export default Search