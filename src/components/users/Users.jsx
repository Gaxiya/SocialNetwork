import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User/user';
import clasess from './users.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './../../Redux/reducers/profileReducer';


function Users (props) {
    const navigate=useNavigate()
    const dispatch= useDispatch()
    const status = useSelector(state=>state.profilePage.statusUser)
    useEffect(() => {
        if(status.toString()==='idle'){
            dispatch(getUsers())
        }
        
        if(
            props.statusRefresh!=='succeeded'&&props.status!=='succeeded')
            {navigate('/login')}
        
    })

    
    
    return(
    <div className={clasess.content}
    >
    {props.users.map((post)=>{
        return <User key={post.link}
        id={post.link} name={post.name}  ava={post.ava}
        status={post.status}  location={post?.location} followed={props.followed}
        follow={props.follow} unFolow={props.unfollow}  />
    })}
    <button className={clasess.buttonNew} 
    onClick={props.createAnotherUsers}>Show more</button>
    </div>)
}
export default Users