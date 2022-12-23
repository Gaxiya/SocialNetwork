import React, { useCallback } from 'react'
import styles from './room.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from './../../../../../htttp/axios';
import { elementSwitch } from './../../../../../helpers/elementSwitch';
// import useLongPress from './../../../../../hooks/useLongPress';
import RoomModalWindow from './roomModalWIndow';
import  styled  from 'styled-components';
import {mergeProps, useLongPress, usePress} from 'react-aria';

const ModalWindow= styled.div`
background-color:#14a755;
width:85px;
height: 40px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
z-index: 2;
position: absolute;
left: 80%;
`

function Room(props) {
    const dispatch = useDispatch()

    const showModal=useSelector(state=>state.roomsList.roomModalWindow.show)
    const roomIdOfModal= useSelector(state=>state.roomsList.roomModalWindow.roomId)

    const show = showModal&&(roomIdOfModal===props.id)
    //choose room
    const callBackToClick= useCallback(()=>{
        props.handleClick({roomId:props.id,roomName:props.roomName})
    },[props])
    // open modal window of room 
    const callBackToLongPress= useCallback(()=>{
        props.handleLongPress({show:true,roomId:props.id})
    },[props,dispatch])

    // const handlers=useLongPress(callBackToLongPress,callBackToClick)
    let  { longPressProps } = useLongPress({
        accessibilityDescription: 'Long press to open modalWindow',
        onLongPress: () => callBackToLongPress()
      });
    
      let { pressProps } = usePress({
        onPress: () => {
            callBackToClick();
        }
      });
    const numberOfNew=props.unreadenMessages.haveUnreaden
    const lastMessage= useSelector(state=>{
        if(state.dialogsPage.message[props.id])
        { return state.dialogsPage.message[props.id][0]}
    })


    let element
        if(lastMessage){
            const pathToFile = `${API_URL}/files${lastMessage.textOrPathToFile}`
            element = elementSwitch(lastMessage.messageType,
                pathToFile,lastMessage.textOrPathToFile)
        }


  return (
    <li 
    className={styles.RommLi}
    >
        <div {...mergeProps(longPressProps,pressProps)}>
        <h6 className={`${styles.RoomHeader} ${styles.noselect}`}>
            {props.roomName}
        </h6>
        <div className={`${styles.lastMessage} ${styles.noselect}`}>
            {lastMessage?element:null}
        {numberOfNew?
        <p className={`${styles.numberOfNew} ${styles.noselect}`}>
            {props.unreadenMessages.unreadenIds.length}
        </p>
        :<></>}
        </div>
        </div>

       
        {show?
        <ModalWindow> 
        <RoomModalWindow
        rename={props.rename}
        leave={()=>{}}>
        </RoomModalWindow>
        </ModalWindow>
        :<></>
        }
       
            
    </li>
  )
}

export default Room