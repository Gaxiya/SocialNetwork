import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../htttp/axios';
export const getProfile = createAsyncThunk('profile/getProfile',async (_,{dispatch}) => {
  const res =await $api.get('/api/profile')
  const resPost= await $api.get('/api/posts')
  dispatch(getData(res.data))
  dispatch(getPosts(resPost.data))
})
export const sendPost = createAsyncThunk('profile/sendPost',async (body,{dispatch}) => {
  const res =await $api.post('/api/post',body)
  dispatch(profileAdd(res.data))
})
export const getUsers = createAsyncThunk('profile/getUsers',async (_,{dispatch}) => {
  const res =await $api.get('/api/users')
  dispatch(toState(res.data))
})
export const followUsers= createAsyncThunk('profile/followUsers',async (body,{dispatch}) => {
  const res =await $api.post('/api/profile/follow',body)
  dispatch(userFollowUnfollow(res.data.followed))
  
})
export const unFollowUsers= createAsyncThunk('profile/unFollowUsers',async (body,{dispatch}) => {
  const res =await $api.delete('/api/profile/unfollow',{data:body})
dispatch(userFollowUnfollow(res.data.followed))
})

let initialState={
  profileData:{
    name:"",
    status:"",
    dateOfBirth:"",
    education:"",
    work:"",
    location:{
      city:"",
      coutry:""
    },
    id:'',
    followed:[]
  },
  posts:[],
  users:[],
  newText:'',
  status:'idle',
  statusUser:'idle',
  statusPost:'idle',
  error:''
}
const profileSlice = createSlice({
  name:'profile',
  initialState,
  reducers:{
    getData:(state,action)=>{
      state.profileData.id= action.payload?.id
      state.profileData.name=action.payload?.name
      state.profileData.status=action.payload?.status
      state.profileData.dateOfBirth=action.payload?.dateOfBirth
      state.profileData.education= action.payload?.education
      state.profileData.work= action.payload?.work
      state.profileData.location= action.payload?.location
      state.profileData.followed= action.payload?.followed
      return state
    },
    getPosts:(state,action)=>{
      state.posts=action.payload
      return state
    },
    profileUpdate:(state,action)=>{
      state.newText=action.payload
      return state
    },
    profileAdd:(state,action)=>{
      let post=action.payload
      state.newText=''
      state.posts.unshift(post)
    },
    toState:(state,action)=>{
      state.users=action.payload
      return state
            },
    userFollowUnfollow:(state,action)=>{
      state.profileData.followed=action.payload
      return state
        }
  },
  extraReducers(builder){
    builder.addCase(getProfile.pending, (state, action) => {
      state.status = action.meta.requestStatus
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.status = action.meta.requestStatus
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.status = action.meta.requestStatus
      state.error = action.error.message
    })
    .addCase(getUsers.pending, (state, action) => {
    state.statusUser = action.meta.requestStatus
    })
    .addCase(getUsers.fulfilled, (state, action) => {
    state.statusUser = action.meta.requestStatus
    })
    .addCase(getUsers.rejected, (state, action) => {
    state.statusUser = action.meta.requestStatus
    state.error = action.error.message
    })
    .addCase(followUsers.pending, (state, action) => {
        state.statusUser = action.meta.requestStatus
    })
    .addCase(followUsers.fulfilled, (state, action) => {
    state.statusUser = action.meta.requestStatus
    })
    .addCase(followUsers.rejected, (state, action) => {
    state.statusUser = action.meta.requestStatus
    state.error = action.error.message
    })
    .addCase(unFollowUsers.pending, (state, action) => {
    state.statusUser = action.meta.requestStatus
    })
    .addCase(unFollowUsers.fulfilled, (state, action) => {
    state.statusUser = action.meta.requestStatus
    })
    .addCase(unFollowUsers.rejected, (state, action) => {
    state.statusUser = action.meta.requestStatus
    state.error = action.error.message
    })
  }
})

export const {profileAdd,profileUpdate,getData,getPosts,toState,userFollowUnfollow}= profileSlice.actions
export default profileSlice.reducer


