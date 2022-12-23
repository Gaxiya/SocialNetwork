import './App.css';
import ProfileContainer from './components/profile/ProfileContainer';
import DialogsContainer from './components/dialogs/DialogsContainer';
import {BrowserRouter,Route, Routes} from "react-router-dom"
import UsersContainer from './components/users/UsersContainer';
import LoginContainer from './components/login/loginContainer';
import RegistrationContainer from './components/login/registrationContainer';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import { useEffect } from 'react';





function App(props) {
useEffect(()=>{
  if(props.statusRefresh==='idle')
  props.req()
},
[props])
 
    return (
      
      <BrowserRouter>
        <div className='app-wraper'>
          <Header logout={props.logout} statusRefresh={props.statusRefresh} status={props.status}/>
          <Nav statusRefresh={props.statusRefresh} status={props.status}/> 
            <div className="App-wrapper-content">
            <Routes>
              <Route path='/login'       element={<LoginContainer />}/>
              <Route path='/registration' element={<RegistrationContainer />}/>
              <Route path='/dialogs'       element={<DialogsContainer /> }/>
              <Route path='/dialogs/:id' element={<DialogsContainer />}/>
              <Route path='/'             element={<ProfileContainer/>}/>
              <Route path='/profile'  element={<ProfileContainer/>}/>
              <Route path='/users' 
              element={<UsersContainer/>}/> 
            </Routes>
            </div>
        </div>
      </BrowserRouter>
    );
}

export default App;
