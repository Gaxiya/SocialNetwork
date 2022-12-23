import { connect } from 'react-redux';
import { profileAdd, profileUpdate } from '../../Redux/reducers/profileReducer';
import Profile from './Profile';


let mapStateToProps=(state)=>{
    return{ 
        statusRefresh:state.loginPage.statusRefresh,
        status:state.loginPage.status,
        profile:state.profilePage
}
}

let mapDispatchToProps=(dispatch)=>{
    return{ 
        update:(text)=>{
            dispatch(profileUpdate(text))
        },
        add:()=>{
            dispatch(profileAdd())
        }
}
}

const ProfileContainer= connect(mapStateToProps,mapDispatchToProps)(Profile)


export default ProfileContainer