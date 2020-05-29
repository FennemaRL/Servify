import React, {useState, useEffect, } from 'react';
import './App.css';
import { Layout, Avatar, Form, Input, Button,  } from 'antd'
import axios from 'axios';


function Devs({devs}) {
return <div  style={{marginBottom :'10vh'}}>
  {devs.map((d,indx) => 
  <Avatar key={indx} size={80} style={{ color: '#282c34', backgroundColor: '#fde3cf' , margin:'1vw'}} alt={d.name}>
    {d.name}
    </Avatar>)
  }</div>
}
function AddDev(){
  const onFinish = values => {
    axios({
      url: `http://localhost:8080/api/v1/character`,
      data: {name:values.username, haircolor:'grey'},
      method: "post"
    })
    .then(res=>alert('Se agrego correctamente'))
    .catch(err=>console.error(err))
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
  };

  return (
    <div style={{width:'60vw', backgroundColor:'#DFE0DC', paddingTop:'1vh' }}>
      <h3 style={{textAlign:'center'}}>Agregate</h3>
    <Form 
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
    </div>

  )
      
}
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/characters')
      .then(res=>setDevs(res.data))
      .catch(err=>console.error(err))
  },[]);
  return (
    <Layout style={{height:'100vh'}}>
      <Layout.Content >
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'30vh'}}>
        <h1>Somos:</h1>
        <Devs devs={devs}/>
        <AddDev/>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default App;
