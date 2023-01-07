import "./index.css"
const DisplayUsers=props=>{
   const {userDetails,deleteUser}=props
    const {id,name,signIn,role,count} = userDetails
    const onClickDelete=()=>{
            deleteUser(id)
    }
    
    return(
           <tbody>
                <tr className="data">
                    <td className="row-data">{id}</td>
                    <td>{name}</td>
                    <td>{signIn}</td>
                    <td>{role}</td>
                    <td><button type="button" className="del-button" onClick={onClickDelete}><img src="https://res.cloudinary.com/dodmtflaq/image/upload/v1672634552/delete-128_owa2q8.png" alt="delete" className="img" /></button></td>
                </tr>
                </tbody>
           
    )

}

export default DisplayUsers