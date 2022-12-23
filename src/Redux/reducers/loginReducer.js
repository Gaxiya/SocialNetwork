import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import $api from '../../htttp/axios'

let initialState= {
    socket:{},
    autologin:true,
    email:'myemail@email.com',
    password:'me456',
    status:'idle',
    statusRefresh:'idle',
    error:''
}
export const loginRequest =createAsyncThunk ('login/loginRequest', async (body,{dispatch}) => {

        const res =await $api.post('/api/login',body)
        localStorage.setItem('token',res.data.accessToken)

    
    
})
export const loginAutoRequest =createAsyncThunk ('login/loginAutoRequest', async (_,{dispatch}) => {

    const res= await $api.get(`/api/refresh`,{headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'}})
})

export const loginSlice= createSlice({
    name:'login',
    initialState,
    reducers:{
        loginStatus:(state)=>{
            state.status = 'succeeded'
        },
        login:(state,action)=>{
            switch (action.payload.input) {
                case 'Email':
                    {
                    state.email=action.payload.text
                    return state;
                    }
                case 'Password':
                    {
                    state.password=action.payload.text
                    return state;
                    }
                default:
                    return state;
            }
        },
        remember:(state)=>{
            state.autologin= !state.autologin
            return state
        },
        logout:(state)=>{
            localStorage.removeItem('token')
            document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            state.status='idle'
            state.statusRefresh='idle'
            return state
        },
        setSocket:(state,action)=>{
            state.socket=action.payload
            return state
        },
        disconectSocket:(state)=>{
            state.socket.disconnect()
        }

    },
    extraReducers(builder){
        builder
        .addCase(loginRequest.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(loginRequest.fulfilled, (state, action) => {
            state.status = 'succeeded'
        })
        .addCase(loginRequest.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(loginAutoRequest.pending, (state, action) => {
            state.statusRefresh = 'loading'
        })
        .addCase(loginAutoRequest.fulfilled, (state, action) => {
            state.statusRefresh = 'succeeded'
        })
        .addCase(loginAutoRequest.rejected, (state, action) => {
            state.statusRefresh = 'failed'
            state.error = action.error.message
        })
    }

})
export const {login,logout,remember,setSocket,disconectSocket} = loginSlice.actions
export default loginSlice.reducer;


