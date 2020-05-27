import React, {useState, useEffect} from 'react';
import './App.css';
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
function Devs({devs}) {
  return <div> {devs.map((d, idx)=><Avatar size={340} key={idx} shape="square"  icon={<UserOutlined />}/>)}</div>
}
function App() {
  const [devs, setDevs] = useState([{}]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/characters')
      .then(res=>setDevs(res.data))
      .catch(err=>console.error(err))
  },[]);
  return (
    <div className="App">
      <div className="container">
      <header >
        <p>
          Selecciona Dev
        </p>
      </header>
        <Devs devs={devs}/>   
    </div>
    </div>
  );
}

export default App;
