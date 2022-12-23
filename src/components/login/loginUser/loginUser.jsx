import { React, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './loginUser.module.css'
import { StyledLabel,StyledInput,StyledSubmitButton } from './../loginStyledComponents/styledcomponents';
import { useSelector, useDispatch } from 'react-redux';
import { remember } from '../../../Redux/reducers/loginReducer';








function LoginUser(props){
    const dispatch= useDispatch()
    const navigator=useNavigate()
    const email=useSelector(state=>state.loginPage.email)
    const password=useSelector(state=>state.loginPage.password)
    const autologin= useSelector(state=>state.loginPage.autologin)
useEffect(()=>{
    if(
        props.loginData.statusRefresh==='succeeded'||props.loginData.status==='succeeded')
        {navigator('/')}
    })
    const emailRef=useRef('Email')
    const passwordRef=useRef('Password')
    const checkboxRemember=()=>{
        dispatch(remember())
    }

    const update=(input,ref)=>{
        const text = ref.current.value
        props.updateLoginData({input,text})}
            return (
                <div className={styles.content}>
                    <div className={styles.links}>
                    <NavLink className={({ isActive })=> isActive ? `${styles.active}`:`${styles.link}`} to={'/login'}>Login</NavLink>
                    <NavLink className={({ isActive })=> isActive ? `${styles.active}`:`${styles.link}`} to={'/registration'}>Registration</NavLink>
                    </div>
                    <div >
                        <form className={styles.formContent} action="login">

                            <label className={styles.formContent}>
                            <StyledLabel >Email:</StyledLabel> 
                            <StyledInput ref={emailRef}
                            onChange={()=>{update('Email',emailRef) }}
                            type='text' name='Email' value={`${props.loginData.email}`} placeholder={"email"}></StyledInput>
                            </label>
                        
                        <label className={styles.formContent} htmlFor="Password">
                            <StyledLabel>Password:</StyledLabel>
                        <StyledInput ref={passwordRef}
                        onChange={()=>{
                            update('Password',passwordRef) }}
                        type='password' name='Password' value={`${props.loginData.password}`} placeholder={"email"}></StyledInput>
                        </label>
                        
                        <label htmlFor="checkbox">
                            
                            <StyledLabel className={styles.checkboxLabel}>
                            <input className={styles.checkbox} onClick={()=>{
                                checkboxRemember()
                            }} type="checkbox" >
                            </input>remember me</StyledLabel>
                            <StyledSubmitButton 
                            onClick={(e)=>{
                                e.preventDefault()
                                props.login({email:email,password:password})
                                }} type="submit" value="Login" />
                        </label>
                        
                        
                        </form>
                    </div>
                </div>
            )
        
    }
    

export default LoginUser;