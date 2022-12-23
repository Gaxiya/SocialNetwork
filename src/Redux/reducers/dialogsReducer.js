import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../htttp/axios';
export const upload = createAsyncThunk('dialogs/upload',async ({file,roomId},{dispatch}) => {
    try {
        const body = new FormData()
        body.append('file', file)
    const res =await $api.post('/upload',body,{headers: {
        'Content-Type':'multipart/form-data',
        'x-room-id': roomId
    }})
    dispatch(setFile(res.data))
    
    } catch (error) {
        
    }
})

const initialState= {
    message:{},
    newMessage:'',
    messageType:null,
    chat:{
    file: '',
    showPreview: false,
    showEmoji: false,
    messagesModalWindow:{
        show:false,
        messageIds:[]
    }
    },
    status:'idle',
    error:''
}
const dialogslice= createSlice({
    name:'dialogs',
    initialState,
    reducers:{
        setMessageType:(state,action)=>{
            state.messageType=action.payload
            return state
        },
        setFile:(state,action)=>{
            state.chat.file=action.payload
            return state
        },
        setShowPreview:(state,action)=>{
            state.chat.showPreview=action.payload
            return state
        },
        setShowEmoji:(state,action)=>{
            state.chat.showEmoji=action.payload
            return state
        },
        dialogsMessage:(state,action)=>{
            state.message[action.payload.roomId]=action.payload.messages
            return state
        },
        dialogsUpdate:(state,action)=>{
            state.newMessage=action.payload
        return state
                    },
        dialogsAdd:(state)=>{
            state.newMessage=''
            return state
        },
        messagesModalWindowUpdate:(state,action)=>{}
    }, extraReducers(builder){
        builder.addCase(upload.pending, (state, action) => {
        state.status = action.meta.requestStatus
        })
        .addCase(upload.fulfilled, (state, action) => {
        state.status = action.meta.requestStatus

        })
        .addCase(upload.rejected, (state, action) => {
        state.status = action.meta.requestStatus
        state.error = action.error.message
        })}
})

export const {setShowPreview,setShowEmoji,setFile,
    dialogsMessage,dialogsAdd,dialogsUpdate,setMessageType}= dialogslice.actions
export default dialogslice.reducer