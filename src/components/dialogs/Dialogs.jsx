import Dialog from './dialog/dialog';
import clasess from'./dialogs.module.css';
import React,{useEffect,useRef } from 'react';
import CreateMessage from './createMessage';
import { useNavigate } from 'react-router-dom';
import useChat from './../../hooks/useChat';
import RoomList from './rooms/roomList/RoomList';






function Dialogs (props){
   
    const { getMessages, chooseRoom, sendMessage,files,setFiles,current,disconnect  } = useChat()
    const scroll=props.dialog.message[current]
    const bottomRef = useRef()
    const navigate=useNavigate()
    const displaySendMessage= current?true:false
    useEffect(()=>{return()=>{
        disconnect()}},[])
    useEffect(
        ()=>{
            if(
                props.statusRefresh!=='succeeded'&&props.status!=='succeeded')
                {navigate('/login')}
            
        },[props.status,navigate])
        useEffect(() => {
            bottomRef.current.scrollIntoView({
                block:'nearest',
                behavior: 'smooth'
            })
        }, [scroll])
    return(
        
    <div className={`${ clasess.Dialogs}`}>
    <div className={clasess.Header}>Dialogs</div>
    <div className= {clasess.Contacts}>
        <div className= {clasess.RoomList}>
            <RoomList getMessages={getMessages} choose={chooseRoom} 
            className= {clasess.Contacts}/>
        </div>
    </div>
    
    <div className= {clasess.Messages}> 
   
        <div >  
        <ul className= {clasess.ul}>
            <p ref={bottomRef}></p>
                {props.dialog.message[current]?.map((cont,index)=>{
            return <li className={clasess.li} key={`${cont.messageId} `}>
                <Dialog  index={index}  userId={cont.userId} 
                name={`${cont.userName}`} type={cont.messageType} text={`${cont.textOrPathToFile}`}/></li>
            })}
            
        </ul>
        </div>
        <div className= {` ${displaySendMessage?clasess.CreateMessage:clasess.CreateMeassageNone}`} >
            <CreateMessage cur={current} sendMessage={sendMessage}
            new={props.dialog.newMessage} add={props.add}
            update={props.update}
            files={files}
            setFiles={setFiles}
            />
        </div>
    </div>
</div>

)}

export default Dialogs




