import { connect } from 'react-redux';
import RegistrationUser from './registrationUser/registration';
import { registration, registrationRequest } from './../../Redux/reducers/registrationReducer';

let mapStateToProps=(state)=>{
   
    return{ 
        registrationData:state.registrationPage
}
}

let mapDispatchToProps=(dispatch)=>{
    return{ 
        updateRegistrationData:(data)=>{
            dispatch(registration(data))
        },
        registration:(body)=>{
            dispatch(registrationRequest(body))
        },

        
}
}

const RegistrationContainer= connect(mapStateToProps,mapDispatchToProps)(RegistrationUser)


export default RegistrationContainer