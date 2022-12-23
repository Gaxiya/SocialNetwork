import { connect } from 'react-redux';
import { login } from '../../Redux/reducers/loginReducer';
import LoginUser from './loginUser/loginUser';
import { loginRequest } from './../../Redux/reducers/loginReducer';

let mapStateToProps=(state)=>{
    return{ 
        loginData:state.loginPage
}
}

let mapDispatchToProps=(dispatch)=>{
    return{ 
        login:(body)=>{
            dispatch(loginRequest(body))
        },
        updateLoginData:(data)=>{
            dispatch(login(data))
        }

}
}

const LoginContainer= connect(mapStateToProps,mapDispatchToProps)(LoginUser)


export default LoginContainer