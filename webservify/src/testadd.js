import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, PictureFilled } from '@ant-design/icons';
import axios from 'axios';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const HorizontalLoginForm = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [, forceUpdate] = useState(); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinishAddDescription = values => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/description`,
        {...values})
      .then(res=> alert("Se agregó con éxito"))
      .catch(err=>alert(err.response.data))
  };

  const onFinish = values => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider`,{name:values.username, phoneNmbr:"1234",  celPhoneNmbr:"12346",  webPage:"www.google.com",  residence:"Ezeiza"})
        .then(res=> alert("Se agregó con éxito"))
        .catch(err=>alert(err.response.data))
  };


  return (
    <div>
      <h2>Agregar Prestador</h2>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese una categoria',
              },
            ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
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
                Send
              </Button>
          )}
        </Form.Item>
      </Form>
      <Form form={form2} name="horizontal_login" layout="inline" onFinish={onFinishAddDescription}>
      <Form.Item
        name="category"
        rules={[
          {
            required: true,
            message: 'Por favor ingrese una categoria',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="category" />
      </Form.Item>
      <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese un username',
            },
          ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
      </Form.Item>
      <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: 'Por favor ingrese una descripcion',
            },
          ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="description" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form2.isFieldsTouched(true) ||
              form2.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Send
          </Button>
        )}
      </Form.Item>
    </Form> 
    <PicturesWall /> 
    </div>
  );
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



function PicturesWall(){
  const [fileList,setFileList] = useState([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },])
  const [previewVisible,setPreviewVisible] = useState(false)
  const [previewTitle,setPreviewTitle] = useState('')
  const [previewImage,setPreviewImage] = useState('')
  const [progress,setProgress] = useState(0)
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
    // console.log(file, fileList, event);
    //Using Hooks to update the state to the current filelist
    setFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };/*
    fmData.append("image", file);
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }*/

 
    const formData = new FormData();
    formData.append('imageFile',file);
    formData.append('name',file.name);
    formData.append('type',file.type);
    formData.append('providerName','Lucas');
    formData.append('serviceName','Electricidad');

    await  axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/img`,
        formData,{
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          }
        })
      .then(res=>  onSuccess("Ok"))
      .catch(err=>   {
        console.log("Eroor: ", err);
        const error = new Error("Some error");
        onError({ err });
      })



  };

  return(
    <div className="clearfix">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        customRequest={uploadImage}
        onChange={handleOnChange}
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
  );
}
/*
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  beforeUpload  = async file => {


    const reader = new FileReader();
    
    console.log('bu')
    console.log(file)
    const formData = new FormData();
    formData.append('imageFile',file);
    formData.append('name',file.name);
    formData.append('type',file.type);
    formData.append('providerName','papa');
    formData.append('serviceName','pepito');
    console.log(reader.readAsArrayBuffer(file))
    
    reader.onload = e => {
        console.log('onload')
        console.log(e.target)
        console.log(e.target.result);
      };
    let result = await  axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/img`,
        formData,{
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          }
        })
      .then(res=>  {
        let obj = {"name": "xxx.png",
      "status": "done"}
      return obj})
      .catch(err=>  false)

      

    return result
}
  handleChange = ({ fileList }) => {
    this.setState({ fileList })};

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  handleOnChange = ({ file, fileList, event }) => {
      // console.log(file, fileList, event);
      //Using Hooks to update the state to the current filelist
      setDefaultFileList(fileList);
      //filelist - [{uid: "-1",url:'Some url to image'}]
    };
    
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          customRequest={this.uploadImage}
          onChange={this.handleOnChange}
          accept=".png, .jpg"
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
*/
export default HorizontalLoginForm;