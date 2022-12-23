import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { API_URL } from '../htttp/axios';
import { useSelector, useDispatch } from 'react-redux';
import { dialogsMessage} from '../Redux/reducers/dialogsReducer'
import { nanoid } from '@reduxjs/toolkit';
import { updateUnreadenMessages } from '../Redux/reducers/dialogsRoomReduser';
import { setSocket } from '../Redux/reducers/loginReducer';



export default function useChat() {
  const dispatch = useDispatch()
  const [files,setFiles] = useState(null)
  
  const current = useSelector((state)=>state.roomsList.currentRoom.roomId)
  const user = useSelector((state)=>state.profilePage.profileData)
  
  const rooms=useSelector((state)=>state.roomsList.rooms)
  const roomsArray =rooms.map(room=>room.roomId)

  const message = useSelector((state)=>state.dialogsPage.newMessage)
  
  const file = useSelector(state=>state.dialogsPage.chat.file)
  const messageType = useSelector(state=>state.dialogsPage.messageType)
  // const [log, setLog] = useState(null)
  
  const { current: socket } = useRef(
    io(
      API_URL, 
      
      {
      auth:{userId:user.id},
      query:{
        roomIds: roomsArray,
        userName: user.name},
      reconnection:true,
      autoConnect: false,
    })
  )
  useEffect(()=>{
    if(roomsArray.length!==0&&!socket.connected){
      socket.auth={userId:user.id}
      socket.io.opts.query={
        roomIds: roomsArray,
        userName: user.name}
        const id= socket.connect()
        dispatch(setSocket(id))
    }
  },[roomsArray,user.name,user.id])

  useEffect(() => {
    if(roomsArray.length!==0){
    socket.on('connect',()=>{
    socket.emit('message:getAll',roomsArray)
  })
  socket.on('message_list:update', (messages,roomId) => {
    dispatch(dialogsMessage({messages:messages,roomId:roomId}))
})
}
  socket.on('unreadenMessages:update',(unreaden,roomId)=>{
    dispatch(updateUnreadenMessages({unreadenMessages:unreaden[user.id],roomId:roomId}))
  })
  socket.on('user_list:update',(userList)=>{
    if(userList.leave){
      socket.emit('dialogs:leave',{roomId:userList.roomId,
        deletedRoom:userList.deleted})
    }
  })
  return ()=>{
    socket
    .off('user_list:update')
    .off('connect')
    .off('message_list:update')
    .off('unreadenMessages:update')
  }
  },[roomsArray])
  useEffect(()=>{
    if(roomsArray.length!==0&&current!==''){
      if(rooms.find(r=>{return `${r.roomId}`===`${current}`}).unreadenMessages.haveUnreaden)
      socket.emit('message:read',current,user.id)
    }
  },[current,roomsArray,user,rooms])



  const getMessages=(current)=>{
    socket.emit('message:get',current)
  }

  const chooseRoom=(e)=>{
    socket.emit('message:get',e.roomId)
  }

  const sendMessage = () => {
    socket.emit('message:add', {
        messageId: nanoid(),
        userId:user.id,
        userName:user.name,
        roomId:current,
        messageType :messageType,
        textOrPathToFile:messageType==='text'?message:file
    },current)
  }

  const removeMessage = (message) => {
    socket.emit('message:remove', message)
  }

  const disconnect =()=>{
    socket.disconnect()
  }


  return { getMessages, chooseRoom, sendMessage,
    removeMessage,files,setFiles,current,disconnect }
}


