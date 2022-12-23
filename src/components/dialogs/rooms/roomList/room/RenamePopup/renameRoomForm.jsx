import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Controller, useForm} from 'react-hook-form'
import { renameRoom, setRoomName } from '../../../../../../Redux/reducers/dialogsRoomReduser';
import styles from './renameRoomForm.module.css'
const RenameRoomForm = () => {
    const newRoomName = useSelector(state=>state.roomsList.newRoomName)
    const dispatch = useDispatch()
    const{control,handleSubmit,}= useForm({
      defaultValues:{
        newRoomName:newRoomName},
      mode:"onChange"
    })
    
    const onSubmit =()=>{
      dispatch(renameRoom())
    }
    const onChange = ()=>{
      dispatch(setRoomName(renameRef.current.value))
    }
    const renameRef = useRef('newRoomName')
  return (
    <div className={styles.wraper}>
<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
  <label >New room name</label>
<Controller
  name='newRoomName'
  control={control}
  render={({fieldState:{error}})=>(
    <div>
    <input
    value={newRoomName} ref={renameRef} onChange={()=>onChange()}
    placeholder='New room name' type="text" />
    {error&&(<div className={styles.error}>{error.message}</div>)}
    </div>
  )}
/>
<input type="submit"  value={`Submit`}/>
</form>
    </div>
  )
}

export default RenameRoomForm