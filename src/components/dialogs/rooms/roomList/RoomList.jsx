import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../../../Redux/reducers/profileReducer';
import Select from 'react-select'
import { createRoom, dialogsSetCurrentRoom,
    getRooms, modalWindowUpdate, setRoomFormPopUp, setUsersSelected } from '../../../../Redux/reducers/dialogsRoomReduser';
import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import styles from './roomList.module.css'
import Room from './room/room';
import ModalWindowForm from '../../../modalWindow/modalWindowForm';
import RenameRoomForm from './room/RenamePopup/renameRoomForm';
const RoomList = (props) => {
    const dispatch= useDispatch()
    const users = useSelector(state=>state.profilePage.users)
    const rooms = useSelector(state=>state.roomsList.rooms)
    const statusUsers = useSelector(state=>state.profilePage.statusUser)
    const statusRooms = useSelector(state=>state.roomsList.status)
    const usersSelected= useSelector(state=>state.roomsList.usersSelected)
    const showRoomFormPopUp= useSelector(state=>state.roomsList.roomModalWindow.showRoomFormPopUp)


    let usersList = users.map((user) => {
        return (
            {value:user.link,label:user.name}
        )
    });
    const handleChange = (e)=>{
        dispatch(setUsersSelected(e))
    }
    const handleAddSubmit = (e)=>{
        e.preventDefault()
        dispatch(createRoom())
    }
    const handleLongPress=(({show,roomId})=>{
        dispatch(modalWindowUpdate({show,roomId}))
    })
    const handleClick = ({roomId,roomName})=>{
        dispatch(modalWindowUpdate({show:false,roomId:''}))
        dispatch(dialogsSetCurrentRoom({roomId,roomName}))
        props.choose({roomId:roomId,roomName:roomName})
        props.getMessages(roomId)
    }
    const renameRoom =(show)=>{
        if(show){
            dispatch(modalWindowUpdate({show:false}))
        }
        dispatch(setRoomFormPopUp(show))
    }

    useEffect(()=>{
        if(statusRooms.toString()==='idle'){
            dispatch(getRooms())
        }
        if(statusUsers.toString()==='idle'){
            dispatch(getUsers())
        }
    },[statusRooms,statusUsers])
    
  return (
    <>
    <ModalWindowForm
    active={showRoomFormPopUp}
    setActive={renameRoom}
    >
        <RenameRoomForm/>
    </ModalWindowForm>
    <div className={styles.usersAdd}>
        <button onClick={handleAddSubmit} className={styles.buttonAdd}>
        <AiOutlineUsergroupAdd/></button>
            <Select
            defaultValue={usersSelected}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
            value={usersSelected}
            onChange={handleChange}
            options={usersList}
            /> 
    </div>
    <div className='.roomList'>
    <ul className={styles.list}>
        {
        rooms.length!==0? rooms.map(({ roomId, roomName,unreadenMessages }) => (

        <Room
        key={roomId} unreadenMessages={unreadenMessages}
        roomName={roomName} id={roomId} rename={renameRoom}
        handleClick={handleClick} handleLongPress={handleLongPress}
        />
        )):<></>}
        
      </ul>
    </div>
    </>
  )
}

export default RoomList