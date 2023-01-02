import React,{useState} from 'react';


import {v4 as uuidv4} from 'uuid'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
  
export default function AddUserPopUp(){

    const [name,setName]=useState("")
    const [role,setRole]=useState("")
    const [signIn,setSignIn]=useState("")
    const [userList,setUserList]=useState([])
    

const addUserDetails=(event)=>{
    event.preventDefault()
    // uuidv4
    const addUser = {
        id: uuidv4(),
        name,
        signIn,
        role,
      }
      
      // setUserList( [...userList, addUser])
       
      setUserList(previousList => [
        ...previousList,
        addUser,
      ]) 
      //console.log(userList)
      setName("")
      setRole("")
      setSignIn("")
      localStorage.setItem("userList",JSON.stringify(userList))
}

const addForName=event=>{
    setName(event.target.value)
}
const addForSignIn=event=>{
    setSignIn(event.target.value)
}
const addForRole=event=>{
    setRole(event.target.value)
}
  return(
  <div>
    <Popup trigger={<button type="button" className="add-user-button">ADD USER</button>} 
     position="right center">
      <form onSubmit={addUserDetails}>
        <label htmlFor='username'>User Name:</label>
        <input type="text" id="username" value={name} onChange={addForName} />
        <label htmlFor='signin'>Signed In Time:</label>
        <input type="text" id="signin" value={signIn} onChange={addForSignIn}  />
        <label htmlFor='rolename'>Role Name</label>
        <input type="text" id="rolename" value={role} onChange={addForRole}  />
        <button type="submit" className="add-user-button">SUBMIT</button>
      </form>
   
    </Popup>
  </div>
  )
};