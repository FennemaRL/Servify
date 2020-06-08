import React,{useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Typography, List, Avatar } from 'antd';
import axios from "axios";
const { Title } = Typography;
function Search(){
    let { category } = useParams();
    const [providers, setCategories] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/services/${category}`)
          .then(res=>{setCategories(res.data)
                        console.log(res.data)})
          .catch(err=>console.error(err))
      },[category]);
    
return (
    <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
        <Title  style={{textAlign:'center'}} level={2}>Busqueda {category}</Title>
        <List itemLayout="horizontal" dataSource={providers} size='large' renderItem={item => (
            <List.Item style={{backgroundColor:'#d9d9d9', borderRadius:5}}>
            <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<p>{item.name}</p>}
                description={item.description? item.description:"no contiene descripcion"}
            />
      </List.Item>
    )}
  />
</div>)
}
export default Search