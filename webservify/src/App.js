import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {Layout, Menu} from 'antd';
import Home from "./home";
import Search from "./search";
import TestAdd from "./testadd";
import {ProfileEditable, ConsumerView} from "./profile/profile";
import Error from "./error";
const {Content, Footer,} = Layout;

const handleClick = () => {
};

function Nav() {
  return <Menu onClick={handleClick} mode="horizontal" style={{backgroundColor:'#f1f6f5', boxShadow:'0 4px 6px -6px #222', marginLeft:'2vw', marginRight:'2vw', width:'96vw', display:'flex'}}>
          <Menu.Item ><NavLink to="/Servify/" >Servify</NavLink></Menu.Item>
          <div style={{flex:1}}></div>
          <Menu.Item ><NavLink to="/Servify/profile/Test" >Ingresa</NavLink></Menu.Item>
        </Menu>
}

function App() {

  return (
    <Layout style={{minHeight:'100vh'}}>
      <Router>
        <Nav/>
        <Layout style={{marginTop:'2vh',minHeight:'70vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Content >
              <Switch>
                  <Route exact path="/Servify/search/:category" component={Search}/>
                  <Route exact path="/Servify/testadd"><TestAdd/></Route>
                  <Route exact path="/Servify/profile/:username" component={ProfileEditable}/>
                  <Route path="/Servify/view/:username/:category?" component={ConsumerView}/>
                  <Route path="/Servify/error" component={Error}/>
                  <Route exact path="/Servify/"><Home/></Route>
                  <Redirect to={{pathname: "/Servify/"}}/>
              </Switch>
          </Content>
        </Layout>
      </Router>
      <Footer style={{backgroundColor:'#1f1f1f', color:'#e6fffb', textAlign:'center',height:'10vh'}}><p style={{ color:'#e6fffb'}}>© Copyright 2020 </p></Footer>
    </Layout>  
  );
}

export default App;
