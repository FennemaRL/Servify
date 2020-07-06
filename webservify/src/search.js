import React, {useEffect, useState} from 'react';
import {NavLink, Redirect, useParams} from "react-router-dom";
import {List, Typography} from 'antd';
import axios from "axios";
import Menu from "antd/es/menu";
import Dropdown from "antd/es/dropdown";
import {DownOutlined} from '@ant-design/icons';
import Rate from "antd/es/rate";

const {Title} = Typography;

function Search() {

    const {category, zone} = useParams();
    const [providers, setProviders] = useState([]);
    const [err, seterr] = useState();
    const menu = (
        <Menu>
            <Menu.Item>
                <p target="ratings_desc" onClick={sortByAverage}>
                    Mejor rating
                </p>
            </Menu.Item>
        </Menu>
    );
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/services/${category}`, {params: {scope: zone}})
            .then(res => {
                setProviders(res.data)
            })
            .catch(err => seterr(err.response.data))
    }, [category, zone]);

    function sortByAverage() {
        setProviders(prevProviders => [...prevProviders].sort((a, b) => (a.average < b.average) ? 1 : -1
        ))
    }

    function orderByDropdown() {
        let areProviders = providers.length >= 1;
        return <Dropdown overlay={menu} disabled={!areProviders}>
            <p className="ant-dropdown-link" style={{cursor:'pointer'}} onClick={e => e.preventDefault()}>
                Ordenar por <DownOutlined/>
            </p>
        </Dropdown>;
    }

    function listOfProviders() {
        return <div className="listSearch">
            <List itemLayout="horizontal" dataSource={providers} size='large' renderItem={item => {
            const noContieneDescripcion = "No contiene descripción"
            return (
                <List.Item className="resSearchItem" style={{backgroundColor: '#d9d9d9', borderRadius: 5}}>
                    <NavLink to={`/Servify/view/${item.username}/${category}`}>
                        <List.Item.Meta 
                            title={
                                <div style={{
                                    display: "flex", flexDirection: "row", justifyContent: "space-between",
                                    alignContent: "center", width: 200, alignItems: "center"
                                }}><p style={{marginTop: 24}}>{item.username}</p>
                                    <Rate allowHalf disabled value={item.average}/>
                                </div>
                            }
                            description={
                                <div style={{
                                    display: "flex", flexDirection: "row", justifyContent: "space-between",
                                    alignItems: "center", paddingLeft:10
                                }}>
                                    {item.description ? item.description : noContieneDescripcion}
                                </div>}
                        />
                    </NavLink>
                </List.Item>
            );
        }}
        />
        </div>
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
            <div style={{display: "flex", flexDirection: "row-reverse"}}>
                {orderByDropdown()}
            </div>
            <div style={{backgroundColor: '#d9d9d9'}}>
                {listOfProviders()}
            </div>
        </div>
        }
        </>
    )
}

export default Search