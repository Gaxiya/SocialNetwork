import { connect } from 'react-redux';
import App from './App';
import { disconectSocket, loginAutoRequest, logout } from './Redux/reducers/loginReducer';



let mapStateToProps=(state)=>{
    return{ 
        autologin:state.loginPage.autologin,
        statusRefresh:state.loginPage.statusRefresh,
        status:state.loginPage.status
}
}

let mapDispatchToProps=(dispatch)=>{
    return{ 
        req:()=>{
            dispatch(loginAutoRequest())
        },
        logout:()=>{
            dispatch(logout())
        },
}
}

const AppContainer= connect(mapStateToProps,mapDispatchToProps)(App)


export default AppContainer