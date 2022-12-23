import { combineReducers } from 'redux';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import registrationSlice from './registrationReducer';
import loginReducer from './loginReducer';
import dialogsRoomReduser from './dialogsRoomReduser';

let rootReducer= combineReducers({
    dialogsPage:dialogsReducer,
    roomsList:dialogsRoomReduser,
    profilePage:profileReducer,
    registrationPage:registrationSlice,
    loginPage:loginReducer
})
export default rootReducer;