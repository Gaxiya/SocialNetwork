import { StyledLabel,StyledInput,StyledSubmitButton } from './../loginStyledComponents/styledcomponents';
import styles from './registrationUser.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';


function RegistrationUser (props){
    const nameRef=useRef('Name')
    const emailRef=useRef('Email')
    const passwordRef=useRef('Password')
    
    const name= useSelector(state=>state.registrationPage.name)
    const email=useSelector(state=>state.registrationPage.email)
    const password=useSelector(state=>state.registrationPage.password)
    const navigator = useNavigate()

    
    const update=(input,ref)=>{
        const text = ref.current.value
        props.updateRegistrationData({input,text})}
    useEffect(()=>{
        
        if(props.registrationData.status==='succeeded'){
            navigator('/login')
        }
    })
        return (
            <div className={styles.content}>
                <div className={styles.links}>
                <NavLink className={({ isActive })=> isActive ? `${styles.active}`:`${styles.link}`} to={'/login'}>Login</NavLink>
                <NavLink className={({ isActive })=> isActive ? `${styles.active}`:`${styles.link}`} to={'/registration'}>Registration</NavLink>
                </div>
                <div>
                    <form className={styles.formContent}  action="registration">
                        <label className={styles.formContent}>
                            <StyledLabel>Name:</StyledLabel>
                            <StyledInput ref={nameRef} 
                            onChange={()=>{
                                update('Name',nameRef) }}
                            type='text' name='Name' value={`${props.registrationData.name}`} placeholder={"Name"} ></StyledInput>
                        </label>
                    <label className={styles.formContent}>
                    <StyledLabel>Email:</StyledLabel>
                    <StyledInput ref={emailRef}
                    
                    onChange={()=>{update('Email',emailRef) }}
                            type='text' name='Email' value={`${props.registrationData.email}`} placeholder={"Email"}></StyledInput>
                    </label>
                    
                    <label className={styles.formContent} htmlFor="Email">
                    <StyledLabel>Password:</StyledLabel>
                    <StyledInput ref={passwordRef} 
                    onChange={()=>{update('Password',passwordRef) }} 
                    type='text' name='Password' value={`${props.registrationData.password}`} placeholder={"Password"}></StyledInput>
                    </label>
                    
                    
                    <StyledSubmitButton onClick={(e)=>{e.preventDefault()
                        props.registration({name:name,email:email,password:password})}} className={styles.button} type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    
}
export default RegistrationUser