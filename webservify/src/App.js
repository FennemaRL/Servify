import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd'
import Home from "./home";
import Search from "./search";
import TestAdd from "./testadd";
import {ProfileEditable, ConsumerView} from "./profile/profile";
import Error from "./error";
import {IsAuth} from './login/auth';
import Nav from './nav';
const {Content, Footer,} = Layout;



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

  let {islog, closeSession, openSession} = IsAuth();
  return (
    <Layout style={{minHeight:'100vh'}}>
      <Router>
        <Nav closeSession={closeSession} openSession={openSession} islog={islog}/>
        <Layout style={{marginTop:'2vh',minHeight:'70vh',display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Content >
              <Switch>
                  <Route exact path="/Servify/search/:category/:zone?" component={Search}/>
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
