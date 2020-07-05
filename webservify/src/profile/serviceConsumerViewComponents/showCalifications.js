import React , {useState} from 'react';
import axios from "axios";
import {Rate, Tooltip, Comment, message} from 'antd';
import {LikeFilled, LikeOutlined} from '@ant-design/icons';


function ShowCalifications({califications, providerName, serviceCategory, addLike}){
  const [action, setAction] = useState(null);

  const like = (providerName, serviceCategory, id) => {
    addLike(serviceCategory, id) 
    axios.post(`${process.env.REACT_APP_API_URL}/api/provider/service/likereview`, {
      providerName: providerName,
      serviceCategory: serviceCategory,
      id: id
    })
      .then(res => {
          message.success("se agregó un like")
      })
      .catch(err => { 
          message.error("no se agregó el like")
    })
  };   
         
    return(
    <div>
        <div style={{backgroundColor:"#F7F9FC", maxHeight:"20vh", overflowY:"scroll", marginLeft:"6.5vw", marginRight:"6.5vw"}}>
        
          {califications.map(calification => {
            const actions = [
              <span key="comment-basic-like">
                <Tooltip title="Like">
                  {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
                    onClick: () => like(providerName, serviceCategory, calification.id, addLike),
                  })}
                </Tooltip>
                <span className="comment-action">{calification.likes}</span>
              </span>,
            ];

            return( 
              <Comment key={calification.id}
              actions={actions}
              author={<div><p>{calification.consumer.name}&nbsp;</p>
                <Rate allowHalf disabled defaultValue={calification.calificationValue}/></div>}
              content={
              <p>
                {calification.message}
              </p>
            }/>
            )}
          )
        }
        </div>
    </div>
    )
  }

export default ShowCalifications