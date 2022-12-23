import { connect } from 'react-redux';
import { followUsers,unFollowUsers } from '../../Redux/reducers/profileReducer';
import Users from './Users';





let mapStateToProps=(state)=>{
    return{
        statusRefresh:state.loginPage.statusRefresh,
        status:state.loginPage.status,
        users:state.profilePage.users,
        followed: state.profilePage.profileData.followed
}
}

let mapDispatchToProps=(dispatch)=>{
    return{ 
        follow:(body)=>{
            dispatch(followUsers(body))
        },
        unfollow:(body)=>{
            dispatch(unFollowUsers(body))
        }
       
}
}

const UsersContainer= connect(mapStateToProps,mapDispatchToProps)(Users)


export default UsersContainer