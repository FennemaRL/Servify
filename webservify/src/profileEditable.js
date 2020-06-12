import React,{ useState, useEffect } from 'react';
import { Button, Tabs, Cascader, Form, Input, } from 'antd';
import { useParams } from "react-router-dom";
import axios from "axios";
const { TextArea } = Input;
const { TabPane } = Tabs;
const  categories = [{value:"Plomeria",label:" Plomeria"},{value:"Electricidad",label:"Electricidad"},{value:"Mecanica",label:"Mecanica"},{value:"Carpinteria",label:"Carpinteria"},{value:"Gas Natural",label:"Gas Natural"},];


const FormEditService = ({username,service}) =>{
  const [form] = Form.useForm()
  const onFinish =  (values) =>{
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/description`,{username:username, description:values.description, category: service.category.categoryName})
      .then(res=> {alert("se agrego con exito")
                   console.log(res.data)})
      .catch(err=>alert(err.response.data))
  };
  
  return (
<Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
  <Form.Item
    initialValue={service.description}
    name="description"
    rules={[
      {
        required: true,
        message: 'Ingrese una descripcion por favor',
      },
    ]}
  >
    <TextArea rows={3} maxLength={150} placeholder={"Ingrese una descripcion "} />
  </Form.Item>
  <Form.Item shouldUpdate>
    {() => (
      <Button
        type="primary"
        htmlType="submit"
        disabled={
          !form.isFieldsTouched(true) ||
          form.getFieldsError().filter(({ errors }) => errors.length).length
        }
      >
        Modificar
      </Button>
    )}
  </Form.Item>
</Form>
) 
}
const ViewEditableService = ({ username, services, setServices }) =>{
 
  const [selectCategory, setselectCategory] = useState("");
  const [activeCategory, setActiveCategorie] = useState();
  
  useEffect(() =>{
    setActiveCategorie(services[0]? services[0].categoryName :null)
  },[services])
  const onChange = categorie => setselectCategory(categorie);
  const add = () => {//hacer el add de la api
      if (selectCategory){
        setServices(prevCate =>[...prevCate,{category:{categoryName:selectCategory[0]}}])
              setActiveCategorie(selectCategory)
      }
  }
  const remove = targetKey =>  {
          setServices(prevSer=>
            [...prevSer].filter(ser => ser.category.categoryName !== targetKey))
          setActiveCategorie(services[0].category ? services[0].category.categoryName : null)
        }
  const onEdit = (targetKey, action) => action === 'add'? add(targetKey) : remove(targetKey);
  const operations = <div><Cascader options={categories} onChange={onChange} placeholder="Seleccione Una categoria" /><Button type="primary" onClick={add}>add</Button></div>
  const onChangeTab = key  => setActiveCategorie(key);
  
  const onFinishAdd = values => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service`,{data:{values:{ username:username,...values}}})
      .then(res=> {alert("se agrego con exito")
                   console.log(res.data)})
      .catch(err=>alert(err.response.data))
  };
  const onFinishDelete = values => {
    console.log(values)
      axios.delete(`${process.env.REACT_APP_API_URL}/api/provider/serviced`,{data:{values:{ username:username,...values}}})
        .then(res=> {alert("se borro con exito")
                     console.log(res.data)})
        .catch(err=>alert(err.response.data))
    };

return ( 
  <div style={{width:'70vw'}}>
      <h1>Categorias ofrecidas</h1>
      <div className="card-container">
      <Tabs tabBarExtraContent={operations} type="editable-card"
      onChange={onChangeTab}
      activeKey={activeCategory}
      onEdit={onEdit}
      hideAdd>
          {services.map(ser=>(
          <TabPane tab={ser.category.categoryName} key={ser.category.categoryName} closable={true}>
            <FormEditService username={username} service={ser} />
        </TabPane>))}
      </Tabs>
      </div>
  </div>
      )
}

function ProfileEditable() {
    let { username } = useParams();
    const  [providerSevices, setproviderSevices] = useState([])
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_API_URL}/api/provider/${username}`)
      .then(res=> {console.log(res.data.offerServices)
        setproviderSevices(res.data.offerServices)})
      .catch(err=>alert(err.response.data))
    },[username] )
      return (
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignContent:'center'}}>
          <div>
          <h1>{username}</h1>
          <ViewEditableService username ={username} services={providerSevices} setServices={setproviderSevices}/>
          </div>
        </div>
          );
};
export default ProfileEditable;
