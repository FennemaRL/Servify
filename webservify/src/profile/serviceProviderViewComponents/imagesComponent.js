import React, { useState, useEffect } from 'react';
import { PlusOutlined, EyeOutlined  } from '@ant-design/icons';
import axios from 'axios';
import { Upload, Modal, message } from 'antd';
import {GetToken} from '../../login/auth'

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  

export function ImagesEditableView({images, providerName, serviceName, viewMode}){
    const [fileList,setFileList] = useState([])
    const [previewVisible,setPreviewVisible] = useState(false)
    const [previewTitle,setPreviewTitle] = useState('')
    const [previewImage,setPreviewImage] = useState('')
  
    useEffect(() => {
       setFileList(prev=>[...prev,...images.map(image=>{return{uid:image.id, name:image.name, status:'done',type:image.type ,preview:`data:${image.type};base64,`+image.bytes, thumbUrl:`data:${image.type};base64,`+image.bytes}})])
           
  }, [images,providerName,serviceName])
    const uploadButton = (<div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>)
  
    const handleCancel = () => {
      setPreviewVisible(false );
      setPreviewTitle('')
      setPreviewImage('')
    
    }
  
    const handlePreview = async file => {
      
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewVisible(true)
      setPreviewImage(file.url || file.preview)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }
    
    const handleOnChange = ({ file, fileList, event }) => {
      setFileList(fileList);
    };
  
    const handleUploadImage = options => {
      const { onSuccess, onError, file } = options;
      const formData = new FormData();
      formData.append('imageFile',file);
      formData.append('name',file.name);
      formData.append('type',file.type);
      formData.append('size', file.size)
      formData.append('providerName',providerName);
      formData.append('serviceName',serviceName);
  
       axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/img`,
          formData,{
            headers: {
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
              'token': 'Bearer ' + GetToken()
            }
          })
        .then(res=>  {onSuccess("Ok"); message.success(res.data)})
        .catch(err=>   {
          message.error(err.response.data)
          onError({ ...err});
        })
    };
    const handleRemove = (photo) =>{
        axios.delete(`${process.env.REACT_APP_API_URL}/api/provider/service/img`,{
            data: {
                providerName:providerName,
                serviceName:serviceName,
                nameImg:photo.name,
                type:photo.type
            }
        ,
          headers: {
            'accept': 'application/json',
            'token': 'Bearer ' + GetToken()
          }
        })
      .then(res=>  {message.success(res.data)})
      .catch(err=>   {
        message.error(err.response.data)
        setFileList(prevState=>[...prevState,photo])
      })
      setFileList(prevState=>prevState.filter(photof=> photof.uid === photo.uid))
        
    }
    return(
      <div style={{marginTop:'2vh'}}>
        <p>Imagenes del servicio:</p>
        <div className="clearfix" style={{ marginLeft:"6.5vw", marginRight:"6.5vw", marginTop:"1vh",backgroundColor:"#F7F9FC", maxHeight:"30vh", overflowY:"scroll", padding:"3vh"}}>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          customRequest={viewMode? null :handleUploadImage}
          onChange={viewMode? null :handleOnChange}
          onRemove={viewMode? null :handleRemove}
          accept=".png, .jpg"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        </div>
      </div>
    );
  }


export function ImagesView({images, providerName, serviceName, viewMode}) {

  const [fileList,setFileList] = useState([])
  const [previewVisible,setPreviewVisible] = useState(false)
  const [previewTitle,setPreviewTitle] = useState('')
  const [previewImage,setPreviewImage] = useState('')

  useEffect(() => {
     setFileList(prev=>[...prev,...images.map(image=>{return{uid:image.id, key:image.name+image.type, name:image.name, status:'done',type:image.type ,preview:`data:${image.type};base64,`+image.bytes, thumbUrl:`data:${image.type};base64,`+image.bytes}})])
         
}, [images,providerName,serviceName])

  const handleCancel = () => {
    setPreviewVisible(false );
    setPreviewTitle('')
    setPreviewImage('')
  
  }

  const handlePreview = async file => {
    
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true)
    setPreviewImage(file.url || file.preview)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  
   return(<>{ !!fileList.length &&
    <div style={{marginTop:'2vh'}}>
      <p>Imagenes del servicio:</p>
      <div  style={{ marginLeft:"6.5vw", display:'flex', marginRight:"6.5vw", marginTop:"1vh",backgroundColor:"#F7F9FC", maxHeight:"30vh", overflowY:"scroll", padding:"3vh"}}>
            {fileList.map(file => (
                <div className="shadowhoverImage" key={file.uid} >
                  <img src={file.url || file.preview} alt="" height={120} />
                  <div className='shadow' />
                  <span className='ico'  onClick={()=>handlePreview(file)}>
                   <EyeOutlined/>
                  </span>
                </div>
    ))}

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </div>
    </div>}</>
  );
 }

