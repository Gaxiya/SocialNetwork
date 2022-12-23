import { root } from "../index";
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
const store ={
  _state:{
    posti:{
      posts:[
      {text:`Post`,id:1},
      {text:`Post`,id:2},
      {text:`Post`,id:3},
      {text:`Post`,id:4}
      ],
      newText:''},
    dialogi:{
          dialogi:{message:[
          {text:`I am a normal popover and I can have text and everything`,name:`Dima`},
          {text:`I am a normal popover and I can have text and everything`,name:`Me`},
          {text:`I am a normal popover and I can have text and everything`,name:`Dima`},
          {text:`'I am a normal popover and I can have text and everything`,name:`Me`}
        ],
        newMessage:''
          },
        con:[
          {id:1,name:`Dima`},
          {id:2,name:`Andrey`},
          {id:3,name:`Sasha`},
          {id:4,name:`Sveta`},
          {id:5,name:`Viktor`},
          {id:6,name:`Another list`},
          {id:7,name:`And another list`}]
        },
    
  },
  dispatch(action){
    let posti={...this._state.posti}
    let messages={...this._state.dialogi.dialogi}
    this._state.dialogi.dialogi=dialogsReducer(this._state.dialogi.dialogi,action)
    
    this._state.posti=profileReducer(this._state.posti,action)
    if(!(posti===this._state.posti)||!(messages===this._state.dialogi.dialogi)){
       this.rerenderEntireTree(root,store)}
  },
  sub(obs){
    store.rerenderEntireTree=obs
  },
  rerenderEntireTree(){},
  getPosti(){
    return store._state.posti
  },
  setPosti(posti){
    store._state.posti=posti
  },
  getContacts(){
    return store._state.dialogi.con
  },
  setContacts(con){
    store._state.dialogi.con=con
  },
  getDialogi(){
    return store._state.dialogi.dialogi.message
  },
  setDialogi(message){
    store._state.dialogi.dialogi.message=message
  },
  getNewMessage(){
    return store._state.dialogi.dialogi.newMessage
  },
  setNewMessage(text){
    store._state.dialogi.dialogi.newMessage=text
  },
  getNewText(){
    return store._state.posti.newText
  },
  setNewText(text){
    store._state.newText=text
  },
}


export default store;


