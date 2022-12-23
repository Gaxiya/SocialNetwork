import { connect } from 'react-redux';
import { dialogsAdd, dialogsUpdate } from '../../Redux/reducers/dialogsReducer';
import Dialogs from './Dialogs';



let mapStateToProps=(state)=>{
    return{
        statusRefresh:state.loginPage.statusRefresh, 
        status:state.loginPage.status,
        dialog:state.dialogsPage
}
}

let mapDispatchToProps=(dispatch)=>{
    return{ 
        update:(text)=>{
            dispatch(dialogsUpdate(text))
        },
        add:()=>{
            dispatch(dialogsAdd())
        }
}
}

const DialogsContainer= connect(mapStateToProps,mapDispatchToProps)(Dialogs)


export default DialogsContainer