import React, { useState } from 'react';
import ButtonLogin from './login/login'

import {NavLink, useHistory} from "react-router-dom";
import { Menu,Tooltip,Button,Cascader} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {categories, scopesC} from '../src/catAndScopes';
import logo from '../src/img/logofinal.png'

function Nav({islog, closeSession, openSession, userName}) {

    return <Menu mode="horizontal" style={{backgroundColor:'#f1f6f5', boxShadow:'0 4px 6px -6px #222', minHeight:'85px', marginLeft:'2vw', marginRight:'2vw',paddingTop:'15px', width:'96vw', display:'flex', justifyContent:'space-around' }}>
            <Menu.Item  style={{display:'flex', justifyContent:'center',alignItems:'center'}}><NavLink to="/Servify/" exact activeStyle={{borderBottom: '4px solid #1890ff',borderRadius:'2px'}}><div style={{display:'flex'}}> <img src={logo} style={{width:'25px',height:'30px'}} alt="logo de la pagina"/><h3 style={{color:'#045454', fontWeight:'bold'}}> ervify </h3></div></NavLink></Menu.Item>
            <Searchbar/>         
            <ButtonLogin closeSession={closeSession} openSession ={openSession} islog={islog} userName={userName} />
          </Menu>
}

const Searchbar=() =>{
  const history = useHistory()
  const [chooseCat, SetChooseCat] = useState()
  const [chooseZone, SetChooseZone] = useState()
  const onChangeCat=cat =>{
    SetChooseCat(cat[0])
  }
  const onChangeZone=zone =>{
  SetChooseZone(zone[0])}
  const searchByCatAndZone = () =>{ //aca la llamada a la api

    history.push(chooseZone? `/Servify/search/${chooseCat}/${chooseZone}`:`/Servify/search/${chooseCat}`)
  }  
  return  <div key='space0' className='searchBar' style={{border: '2px solid rgba(28,110,164,0.12)', borderRadius: '12px',  marginTop: '-10px', position: 'relative'}} >
  <span style={{position:'absolute',zIndex: '1', top:-12 ,left:10, height: 30, fontWeight:'500',}}>Busca un servicio</span>
  <Cascader options={categories} className='cascaderMobile' onChange={onChangeCat} placeholder="Selecciona una categoria"/>
  <Cascader options={scopesC} className='cascaderMobile' onChange={onChangeZone}   placeholder="Selecciona una zona"/>
  <Tooltip title={chooseCat? "Buscar" : "Seleccione una categoria primero para buscar"  } >
  <Button type="primary" shape="round" icon={<SearchOutlined />} onClick={searchByCatAndZone} disabled={!chooseCat}/>
  </Tooltip>
</div>
}
export default Nav;