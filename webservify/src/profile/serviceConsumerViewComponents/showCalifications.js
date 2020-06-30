import React from 'react';
import {Rate, List} from 'antd';

function ShowCalifications({califications}){
    return(
    <div>
        <div style={{backgroundColor:"#F7F9FC", maxHeight:"20vh", overflowY:"scroll", marginLeft:"6.5vw", marginRight:"6.5vw"}}>
        <List
        bordered= {true}
        itemLayout="horizontal"
        dataSource={califications}
        renderItem={calification => (
          <List.Item>
            <List.Item.Meta
              title={<div> 
                   <p>{calification.consumer.name}</p>            
                  <Rate allowHalf disabled defaultValue={calification.calificationValue}/>
                  </div>}
                    description={calification.message}/>
          </List.Item>
        )}
      />
        </div>
    </div>
    )
}
export default ShowCalifications