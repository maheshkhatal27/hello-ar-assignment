import { Component } from "react"
import "./index.css"
import Navbar from "../Navbar"
import DisplayUsers from "../DisplayUsers"

import {v4 as uuidv4} from 'uuid'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class Home extends Component{
    state = {isColorOn:false,userData:[],username:"",signIn:"",role:"",count:1}

     getData=()=>{
         
        const userRecords = JSON.parse(localStorage.getItem('userList')) || []
         // console.log(userData)
         this.setState({userData:[...userRecords]})

    }

    componentDidMount(){
        this.getData()
    }

    setColor=()=>{
        const {isColorOn}=this.state
         // this.setState({isColorOn:true})
        this.setState(prevState => ({isColorOn: !prevState.isColorOn}))
        //console.log(isColorOn)
    }

    deleteUser=(id)=>{
        //console.log(`to be deleted: ${id}`)
    const {userData} = this.state
    const filteredUserList = userData.filter(eachUser => eachUser.id !== id)
    this.setState({
      userData: filteredUserList,
    })
    }

     addUserDetails=(event)=>{
        event.preventDefault()
        const {username,signIn,role,userData,count}=this.state
        
        const addUser = {
            id: uuidv4(),
            name:username,
            signIn,
            role,
            count,
          }
          
         
          this.setState(prevState => ({
            userData: [...prevState.userData, addUser],
            username: '',
            signIn: '',
            role:"",
            count: prevState.count + 1,
          }))
           
          console.log(count)
        localStorage.setItem("userList",JSON.stringify(userData))
    }

    addForName=(event)=>{
        this.setState({username:event.target.value})

    }
    addForSignIn=(event)=>{
        this.setState({signIn:event.target.value})

    }
    addForRole=(event)=>{

        this.setState({role:event.target.value})
    }
    

    render(){
        const {isColorOn}=this.state
        const activateTab = isColorOn ? "bg-color" : ""
        const {userData}=this.state
        const {username,signIn,role,count} =this.state
       // console.log(userData)
        
        return(

            <>
                <Navbar />
                <div className="home-pg">
                <div className="left-bar-container">
                    <h1 className="items">Products</h1>
                    <h1 className="items">Demo Script</h1>
                    <h1 className="items">Customers</h1>
                    <h1 className="items">Sales Team</h1>
                    <h1 className="items">Demos</h1>
                    <h1 className={`items ${activateTab}`} onClick={this.setColor}>  Settings</h1>
                </div>
                
                {isColorOn ? (<div>
    <Popup trigger={<button type="button" className="add-user-button">ADD USER</button>} 
     position="right center">
      <form onSubmit={this.addUserDetails}>
        <label htmlFor='username'>User Name:</label>
        <input type="text" id="username" value={username} onChange={this.addForName} />
        <label htmlFor='signin'>Signed In Time:</label>
        <input type="text" id="signin" value={signIn} onChange={this.addForSignIn}  />
        <label htmlFor='rolename'>Role Name</label>
        <input type="text" id="rolename" value={role} onChange={this.addForRole}  />
        <button type="submit" className="add-user-button">SUBMIT</button>
      </form>
    </Popup>
  </div>) :"" }
                {isColorOn ? (<div className="table-box">
                            <table className="column-design" border={1} cellSpacing={0}>
                            <thead>
                            <tr className="row">
                                    <th className="area-1">#</th>
                                    <th className="area">User</th>
                                    <th className="area">Last Signed In</th>
                                    <th className="area">Role</th>
                                    <th className="area"></th>
                                </tr>
                            </thead>
                            
          {userData.map(eachUser => (
            <DisplayUsers
              key={eachUser.id}
              userDetails={eachUser}
              deleteUser={this.deleteUser}
    
            />
          ))}
          
                                
                            </table>
                   
                            <div className="pagination-container">
                    <p className="direction">Previous</p>
                    <button type="button" className="number-button btn-1">1</button>
                    <button type="button" className="number-button btn-2">2</button>
                    <p className="direction">Next</p>
                </div> 
                   </div>) : ""}

               
                   
                 

                </div>
                 
            </>
        )
    }

}

export default Home
