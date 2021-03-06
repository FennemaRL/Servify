import React , {useState} from 'react';
import axios from "axios";
import {Rate, Tooltip, Comment, message} from 'antd';
import {LikeFilled, LikeOutlined} from '@ant-design/icons';


function ShowCalifications({califications, providerName, serviceCategory, addLike}){
  const [action, ] = useState(null);

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
        <div className="containerList" >
        
          {califications.map(calification => {
            const actions = [
              <span style={{paddingLeft:20,paddingTop:0,marginTop:0}} key="comment-basic-like">
                <Tooltip title="Like">
                  {React.createElement(action === 'liked' ? LikeFilled : LikeOutlined, {
                    onClick: () => like(providerName, serviceCategory, calification.id, addLike),
                  })}
                </Tooltip>
                <span className="comment-action">{calification.likes}</span>
              </span>,
            ];

            return( 
              <div key={calification.id}>
              <Comment key={calification.id}
              actions={actions}
              author={<div style={{display:'flex'}}><p style={{paddingLeft:10,paddingRight:10, fontSize:'.85rem'}}>{calification.consumer.name}</p>
                <Rate allowHalf disabled defaultValue={calification.calificationValue}/></div>}
              content={
              <p style={{paddingLeft:20}}>
                {calification.message}
              </p>
            }/>
            <hr style={{border:'0.1px solid #bfbfbf', width:'98%'}}/>
            </div>
            )}
          )
        }
        </div>
    </div>
    )
  }

export default ShowCalifications