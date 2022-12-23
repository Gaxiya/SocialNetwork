import clasess from'./createMessage.module.css';
import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  setFile, setMessageType, setShowEmoji, setShowPreview } from '../../Redux/reducers/dialogsReducer';
import { upload } from './../../Redux/reducers/dialogsReducer';
import EmojiMart from './dialog/Input/EmojiMart/EmojiMart';
import FileInput from './dialog/Input/FileInput';
import {IoSend} from 'react-icons/io5'


function CreateMessage (props){
  const messageType = useSelector(state=>state.dialogsPage.messageType)
  const file = useSelector(state=>state.dialogsPage.chat.file)
const {showPreview,showEmoji}=useSelector(state=>state.dialogsPage.chat)
const dispatch = useDispatch()
const Ref= React.createRef();
const [submitDisabled, setSubmitDisabled] = useState(true)
// const inputRef = useRef()
const sendMessage=()=>{
  if (showEmoji) {
    dispatch( setShowEmoji(false))
  }
  // отправляем сообщение
  props.sendMessage()
  props.add()
  // сбрасываем состояние
  props.setFiles(null)
}

useEffect(()=>{
  if(file){
          sendMessage(file)
          dispatch(setFile(null))
  }
},[file])

useEffect(()=>{

  if(file){
    sendMessage(file)
    dispatch(setMessageType(null))
    dispatch(setFile(null))
}

if(messageType==='text'){

  sendMessage()
  dispatch(setMessageType(null))
}
},[messageType])
useEffect(() => {
  setSubmitDisabled(!props.new.trim() && !props.files)
}, [props.new, props.files])

useEffect(() => {
  if(props.files){
    dispatch(setShowPreview(props.files.name))
  }
  dispatch(setShowPreview(null))
}, [props.files])

const onSubmit = async (e) => {
  e.preventDefault()
  if (submitDisabled) return
  if (!props.files) {
    // типом сообщения является текст
    dispatch(setMessageType('text'))
  } else {
    // типом сообщения является файл
    props.add()
    try {
        dispatch(upload({file:props.files,roomId:props.cur}))
        const type = props.files.type.split('/')[0]
        dispatch(setMessageType(type))
        // const type = props.files.type.split('/')[0]
        // dispatch(setMessageType(type))
        //   sendMessage(type,res.payload)
        //   dispatch(setFile(''))
    } catch (e) {
      console.error(e)
    }
  }
  // скрываем компонент с эмодзи, если он открыт
 
}
function update(){
    let text=Ref.current.value
    props.update(text)
}
  return(
  <div className={clasess.createPost}>
      <FileInput files={props.files} setFiles={props.setFiles}/>
      <EmojiMart text={props.new} messageInput={Ref}/>
      <input className={clasess.textarea} disabled={showPreview}  onChange={(e)=>{update()}} ref={Ref} value={ props.new} name="" id="" ></input>
      <button  className={clasess.button} onClick={(e)=>{onSubmit(e)}}> <IoSend/>
      </button>
  </div>
    )

}
export default CreateMessage



