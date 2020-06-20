import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from "react-router-dom";
import {Layout, Menu} from 'antd';
import Home from "./home";
import Search from "./search";
import TestAdd from "./testadd";
import {ProfileEditable, ConsumerView} from "./profile/profile";
import Error from "./error";
import ButtonLogin from './login/login'
import {IsAuth} from './login/auth';
const {Content, Footer,} = Layout;



function Nav({islog, setIslog}) {
  return <Menu mode="horizontal" style={{backgroundColor:'#f1f6f5', boxShadow:'0 4px 6px -6px #222', marginLeft:'2vw', marginRight:'2vw',paddingLeft:'1vw', paddingRight:'1vw', width:'96vw', display:'flex'}}>
          <Menu.Item><NavLink to="/Servify/" exact activeStyle={{borderBottom: '4px solid #1890ff',borderRadius:'2px'}} style={{minWidth:'6vw', textAlign:'center'}}><h3> Servify </h3></NavLink></Menu.Item>
          <div style={{flex:1}}></div>
          <ButtonLogin setIslog={setIslog} islog={islog}/>
        </Menu>
}
function PrivateRoute({ children,islog, ...rest }) {
  return(
    <Route
      {...rest}
      render={({ location }) =>
       islog ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/Servify/",
              state: { from: location }
            }}
          />
          )
      }/>
      )
        
}
function App() {

  let {islog, setIslog} = IsAuth('user');
  return (
    <Layout style={{minHeight:'100vh'}}>
      <Router>
        <Nav setIslog={setIslog} islog={islog}/>
        <Layout style={{marginTop:'2vh',minHeight:'70vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Content >
              <Switch>
                  <Route exact path="/Servify/search/:category" component={Search}/>
                  <Route exact path="/Servify/testadd"><TestAdd/></Route>
                  <PrivateRoute exact path="/Servify/profile/:username" children={<ProfileEditable/>} islog={islog}>
                  </PrivateRoute>
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
