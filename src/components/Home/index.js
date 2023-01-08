import { Component } from "react"
import "./index.css"
import Navbar from "../Navbar"
import DisplayUsers from "../DisplayUsers"
import {v4 as uuidv4} from 'uuid'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { RiAdminLine } from "react-icons/ri";

const pageSize=5;
class Home extends Component{
    state = {isColorOn:false,prodTab:false,salesTab:false,demoTab:false,custTab:false,scriptTab:false,
      userData:[],username:"",signIn:"",role:"Admin",count:1,currentPage:1}
    


     getData=()=>{
        const userRecords = JSON.parse(localStorage.getItem('userList')) || []
         // console.log(userData)
         this.setState({userData:[...userRecords]})
    }

    componentDidMount(){
        this.getData()
    }

    setColor=()=>{
        const {prodTab,salesTab,demoTab,scriptTab,custTab}=this.state
        this.setState({isColorOn:true,prodTab:false,salesTab:false,demoTab:false,scriptTab:false,custTab:false})
       // this.setState(prevState => ({isColorOn: !prevState.isColorOn}))
        //console.log(isColorOn)
    }
    setProdColor=()=>{
      const {prodTab}=this.state
      this.setState({isColorOn:false,prodTab:true,salesTab:false,demoTab:false,scriptTab:false,custTab:false})
      
  }

  
  setDemoColor=()=>{
    const {demoTab}=this.state
    this.setState({isColorOn:false,prodTab:false,salesTab:false,demoTab:true,scriptTab:false,custTab:false})
      
}
setScriptColor=()=>{
  const {scriptTab}=this.state
  this.setState({isColorOn:false,prodTab:false,salesTab:false,demoTab:false,scriptTab:true,custTab:false})
      
}

setCustColor=()=>{
  const {custTab}=this.state
  this.setState({isColorOn:false,prodTab:false,salesTab:false,demoTab:false,scriptTab:false,custTab:true})
      
}
setSalesColor=()=>{
  const {salesTab}=this.state
  this.setState({isColorOn:false,prodTab:false,salesTab:true,demoTab:false,scriptTab:false,custTab:false})
      
}

    deleteUser=(id)=>{
        //console.log(`to be deleted: ${id}`)
    const {userData} = this.state
    const filteredUserList = userData.filter(eachUser => eachUser.id !== id)
    this.setState({
      userData: filteredUserList,
    })
    
    localStorage.setItem("userList",JSON.stringify(filteredUserList))

  

    }

    handlePageChange = page => {
      this.setState({ currentPage: page });
    };

    handlePrevious=()=>{      
      const{currentPage}=this.state
      const numberOfPages=Math.ceil(this.state.userData.length/pageSize)
      
      if(currentPage > 1){
        this.setState(prev=>({
          currentPage:prev.currentPage - 1
        }))
      }
      

    }
    
    handleNext=()=>{
      const{currentPage}=this.state
      const numberOfPages=Math.ceil(this.state.userData.length/pageSize)
      
      if(currentPage < numberOfPages){
        this.setState(prev=>({
          currentPage:prev.currentPage + 1
        }))
      }
    }

    onClickAddUser=(event)=>{
       event.preventDefault()
        const {username,signIn,role,userData,count}=this.state
        
       const userId=uuidv4().slice(0,5)
       
        const addUser = {
            id: userId,
            name:username,
            signIn,
            role,
            count,
          }
          
          this.setState(prevState => ({
            userData: [...prevState.userData, addUser],
            username: '',
            signIn: '',
            role:"Admin",
            count:prevState.count + 1,
          }))
           
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
        const {isColorOn,currentPage}=this.state
        const activateTab = isColorOn ? "bg-color" : ""
        const activateProdTab = this.state.prodTab ? "bg-color" : ""
        const activateSalesTab = this.state.salesTab ? "bg-color" : ""
        const activateCustTab = this.state.custTab ? "bg-color" : ""
        const activateScriptTab = this.state.scriptTab ? "bg-color" : ""
        const activateDemoTab = this.state.demoTab ? "bg-color" : ""
        const {userData}=this.state
        const {username,signIn,role,count} =this.state
       // console.log(userData)
       const pageCount = Math.ceil(userData.length / pageSize);
      // console.log(pageCount)

      // if (pageCount === 1) return null;
       const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li
          className={`each-page ${i === currentPage ? 'active' : ''}`}
          key={i}
          onClick={() => this.handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
        
        return(

            <>
                <Navbar />
                <div className="home-pg">
                <div className="left-bar-container">
                    <h1 className={`items ${activateProdTab}`} onClick={this.setProdColor}>Products</h1>
                    <h1 className={`items ${activateScriptTab}`} onClick={this.setScriptColor}>Demo Script</h1>
                    <h1 className={`items ${activateCustTab}`} onClick={this.setCustColor}>Customers</h1>
                    <h1 className={`items ${activateSalesTab}`} onClick={this.setSalesColor}>Sales Team</h1>
                    <h1 className={`items ${activateDemoTab}`} onClick={this.setDemoColor}>Demos</h1>
                    <h1 className={`items ${activateTab}`} onClick={this.setColor}>Settings</h1>
                </div>
                
                {isColorOn ? (<div>
    <Popup trigger={<button type="button" className="add-role-user">ADD USER</button>} 
     position="right center">
            <div className="popup-container">
                <div className="role-logo-container">
                    <RiAdminLine size={150}/>
                    <p className="lorem-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className="user-info-container">
                    <h1 className="user-information">User Information</h1>
                    <form onSubmit={this.onClickAddUser} className="form-container">
                      <label htmlFor="emailid" className="email-label">Email id of user</label>
                      <input type="text" id="emailid" className="email-input" value={username} onChange={this.addForName} />
                      <label htmlFor='signin'>Signed In Time:</label>
                      <input type="text" id="signin" className="sign-in-input" value={signIn} onChange={this.addForSignIn}  />
                      <label htmlFor="role" className="role-label">Role</label>
                          <select name="role" id="role" value={role} className="role-input" onChange={this.addForRole} >
                              <option value="Admin">Admin</option>
                              <option value="Owner">Owner</option>
                              <option value="Sales">Sales</option>
                          </select>
                      <div className="button-container">
                        <button type="submit" className="button-add">ADD</button>
                      </div>
                   </form> 
                </div>
            </div>
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
                                    <th className="delete-area"></th>
                                </tr>
                            </thead>
                            
                            {userData.slice((currentPage - 1) * pageSize,
              currentPage * pageSize).map(eachUser => (
            <DisplayUsers
              key={eachUser.id}
              userDetails={eachUser}
              deleteUser={this.deleteUser}
            />
          ))}
		                        </table>
                   
                            <ul className="pages">
                            <li><button className="button-action" onClick={this.handlePrevious}>Previous</button></li>
                            {pages}
                            <li><button className="button-action" onClick={this.handleNext}>Next</button></li>
                            </ul>                
                   </div>) : ""}
                </div>
            </>
        )
    }

}

export default Home
