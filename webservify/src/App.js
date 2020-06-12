import React from 'react';
import './App.css';
import {  BrowserRouter as Router,  Switch, Route, NavLink, Redirect} from "react-router-dom";
import { Layout,Menu} from 'antd';
import Home from  "./home";
import Search from "./search";
import TestAdd from "./testadd";
import ProfileEditable from "./profile/profileEditable";

const { Content, Footer } = Layout;

const handleClick = e => {
};
function Nav() {
  return <Menu onClick={handleClick} mode="horizontal" style={{backgroundColor:'#f1f6f5', boxShadow:'0 4px 6px -6px #222', marginLeft:'2vw', marginRight:'2vw'}}>
        <Menu.Item> <NavLink to="/Servify/" >Servify</NavLink></Menu.Item>
        <Menu.Item> <NavLink to="/Servify/profile/Test" >Ingresa</NavLink></Menu.Item>
      </Menu>
}

function App() {

  return (
    <Layout style={{minHeight:'100vh'}}>
      <Router>
        <Nav/>
        <Layout style={{marginTop:'2vh',minHeight:'70vh'}}>
          <Content >
            <Switch >
              <Route exact path="/Servify/search/:category" component={Search}/> 
              <Route exact path="/Servify/testadd"><TestAdd /></Route>
              <Route exact path="/Servify/profile/:username" component={ProfileEditable}/>
              <Route path="/Servify/"><Home /></Route>
              <Redirect to={{ pathname: "/Servify/" }}/>
            </Switch>
          </Content>
        </Layout>
      </Router>
      <Footer style={{backgroundColor:'#1f1f1f', color:'#e6fffb', textAlign:'center',height:'10vh'}}><p style={{ color:'#e6fffb'}}>© Copyright 2020 </p></Footer>
    </Layout>  
  );
}

export default App;
