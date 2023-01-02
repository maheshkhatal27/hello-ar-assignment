import "./index.css"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { RiAdminLine } from "react-icons/ri";

const Navbar=()=>(
    <div className="navbar-container">
        <div className="logo-name-container">
            <img src="https://res.cloudinary.com/dodmtflaq/image/upload/v1672550920/logo-ar_tsmi0z.png" alt="logo" className="logo-resize" />
            <h1 className="my-app">MY APPLICATION</h1>
        </div>
        <div className="img-name-container">
            <img src="https://res.cloudinary.com/dodmtflaq/image/upload/v1672552551/img_avatar_tnsg52.png" alt="profile" className="profile-resize" />
            

            <Popup trigger={<button type="button" className="user-button"><h1 className="name">Barde Ridel</h1></button>} 
     position="center">
            <div className="popup-container">
                <div className="role-logo-container">
                    <RiAdminLine size={150}/>
                    <p className="lorem-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className="user-info-container">
                    <h1 className="heading">User Information</h1>
                    <label htmlFor="emailid" className="email">Email id of user</label>
                    <input type="text" id="emailid" className="email-input" />
                    
                    <label htmlFor="role" className="role">Role</label>
                        <select name="role" id="role">
                            <option value="admin">Admin</option>
                            <option value="owner">Owner</option>
                        </select>
                    <div className="button-container">
                    <button type="button" className="button-cancel">CANCEL</button>
                    <button type="button" className="button-add">ADD</button>
                    </div>
                   
                </div>
            </div>
     </Popup>    

         <div>
  </div>
</div>
 </div>
)
export default Navbar
