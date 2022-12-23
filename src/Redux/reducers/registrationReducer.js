import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import $api from '../../htttp/axios'


let initialState= {
    name:'',
    email:'',
    password:'',
    status:'idle',
    error:''
}
export const registrationRequest =createAsyncThunk ('registration/registrationRequest', async (body,{dispatch}) => {
    const response = await $api.post('/api/registration',body)
    localStorage.setItem('token',response.data.refreshToken)
    if (!localStorage.getItem('token').isEmpty()) {
        dispatch(registrationStatus())
    }
    
    
})
export const registrationSlice= createSlice({
    name:'registration',
    initialState,
    reducers:{
        registrationStatus:(state)=>{
            state.status = 'succeeded'
        },
        registration:(state,action)=>{
            switch (action.payload.input) {
                case 'Name':
                    {
                    state.name=action.payload.text
                    return state;
                    }
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
        }
    },
    extraReducers(builder){
        builder.addCase(registrationRequest.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(registrationRequest.fulfilled, (state, action) => {
            state.status = 'succeeded'
        })
        .addCase(registrationRequest.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }

})
export const {registration,registrationStatus} = registrationSlice.actions
export default registrationSlice.reducer;