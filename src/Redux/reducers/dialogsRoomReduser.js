import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../htttp/axios';



export const getRooms = createAsyncThunk('dialogs/getRooms',async (_,{dispatch}) => {
try {
    const res =await $api.get('/api/messages/')
    dispatch(setRooms(res.data))
} catch (error) {
    
}
})

export const renameRoom = createAsyncThunk('dialogs/renameRoom',async (_,{dispatch,getState}) =>{
    try {
        const body = {roomId:getState()
            .roomsList.roomModalWindow.roomId,
            roomName:getState().roomsList.newRoomName
        }
        const res =await $api.post('/api/messages/renameRoom',body)
        
        dispatch(setRenamedRoom(res.data))
        dispatch(setRoomName(''))
        dispatch(setRoomFormPopUp(false))
    } catch (error) {
        
    }
})

export const createRoom = createAsyncThunk('dialogs/createRoom',async(_,{dispatch,getState})=>{
    try {
        let state = getState().roomsList.usersSelected
        const roomRes =await $api.get('/api/messages/create')
        if(state.length>0){
        const mapOfUsers= state.map((user)=>user.value)
        const body={roomId:roomRes.data.roomId,users:mapOfUsers}
        const roomAdd = await $api.post('/api/messages',body)
        dispatch(setUsersSelected([]))
        dispatch(setRoom(roomAdd.data))
        }
        else{
            dispatch(setRoom(roomRes.data))
        }
    } catch (error) {
        
    }
 
})
const initialState= {
    newRoomName:'',
    roomModalWindow:{
        show:false,
        showRoomFormPopUp:false,
        roomId:'',
    },
    currentRoom:{
        roomId: '',
        roomName:'',
        users: []
    },
    usersSelected:[],
    rooms:[],
    status:'idle',
    error:''
}
const dialogslice= createSlice({
    name:'dialogs',
    initialState,
    reducers:{
        setRoom:(state,action)=>{
            state.rooms.push(action.payload)
            return state
        },
        setRooms:(state,action)=>{
            state.rooms.push(...action.payload)
            return state
        },
        setUsersSelected:(state,action)=>{
            state.usersSelected=action.payload
            return state
        },
        dialogsSetCurrentRoom:(state,action)=>{
            
            state.currentRoom.roomId=action.payload.roomId
            state.currentRoom.roomName=action.payload.roomName
            return state
        },
        updateUnreadenMessages:(state,action)=>{
            const index = state.rooms.findIndex(r=>r.roomId===action.payload.roomId)
            state.rooms[index].unreadenMessages=action.payload.unreadenMessages
            return state
        },
        modalWindowUpdate:(state,action)=>{
                state.roomModalWindow.show=action.payload.show
                if(action.payload.roomId){
                    state.roomModalWindow.roomId=action.payload.roomId
                }
                return state
        },
        setRoomName:(state,action)=>{
        state.newRoomName=action.payload
            return state
        },
        setRenamedRoom:(state,action)=>{
            const index = state.rooms.findIndex(r=>r.roomId===action.payload.roomId)
            state.rooms[index]=action.payload
            return state
        },
        setRoomFormPopUp:(state,action)=>{
            state.roomModalWindow.showRoomFormPopUp=action.payload
            return state;
        }
    },  
    extraReducers(builder){
        builder.addCase(getRooms.pending, (state, action) => {
          state.status = action.meta.requestStatus
        })
        .addCase(getRooms.fulfilled, (state, action) => {
          state.status = action.meta.requestStatus
        })
        .addCase(getRooms.rejected, (state, action) => {
          state.status = action.meta.requestStatus
          state.error = action.error.message
        })}
})

export const {
    setUsersSelected,setRooms,setRoomFormPopUp,
    setRoom,dialogsSetCurrentRoom,
    updateUnreadenMessages,modalWindowUpdate,
    setRoomName,setRenamedRoom
}= dialogslice.actions
export default dialogslice.reducer