import React from 'react';
import {Comment} from 'antd';

function Question ({question, consumerName,  providerName, answer, actions}){
    return(
        <Comment   author={<p>{consumerName}</p>}  content={<p>{question}</p>} actions={ actions}>
            {answer &&  <Comment author={<p>{providerName}</p>}  content={<p>{answer}</p>}/>}
        </Comment>
    )
}

export default  Question