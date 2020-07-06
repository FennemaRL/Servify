import React from 'react';
import {Comment} from 'antd';

function Question ({question, consumerName,  providerName, answer, actions}){
    return(
        <>
        <Comment   author={<p>{consumerName}</p>}  content={<div style={{paddingLeft:10}}><p>{question}</p></div>} actions={ actions}>
            {answer &&  <Comment author={<p>{providerName}</p>}  content={<div style={{paddingLeft:10}}><p>{answer}</p></div>}/>}
        </Comment>
        <hr style={{border:'0.1px solid #bfbfbf'}}/>
        </>
    )
}

export default  Question