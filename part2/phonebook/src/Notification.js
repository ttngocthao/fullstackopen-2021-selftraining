import React from 'react'

const Notification = ({type,text}) => {
    
    const addStyle = {
        padding:'20px',
        borderColor: 'green',
        color: 'green' ,
        backgroundColor:'silver',
        borderRadius:'5px',
        borderWidth:'5px',
        borderStyle:'solid',
        fontSize:'20px'
    }
    const removeStyle = {
        padding:'20px',
        borderColor:'red',
        color:'red',
         backgroundColor:'silver',
        borderRadius:'5px',
        borderWidth:'5px',
        borderStyle:'solid',
        fontSize:'20px'
    }
    return (
        <div style={type==='add' ? {...addStyle} : {...removeStyle}}>
            {text}
        </div>
    )
}

export default Notification
