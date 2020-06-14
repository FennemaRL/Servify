import React from 'react';
import { Redirect } from 'react-router-dom';
import csc from './img/404.jpg'


function Error(props){
    console.log(props)
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignContent:'center', alignItems:'center'}}>
            {(!props.location.state && <Redirect to="/Servify/" /> )||(
            <>
                <h2>Lo sentimos ocurrio un error:</h2>
                <h3>{props.location.state.message}</h3>
                <img style={{width:'45vw'}}src={csc} alt='error 404'/>
            </>
            )
            }
        </div>
    )
}
export default Error;
