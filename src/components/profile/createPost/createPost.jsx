import { useRef, useEffect } from 'react';
import clasess from'./createPost.module.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { sendPost } from '../../../Redux/reducers/profileReducer';

function CreatePost (props){
    const dispatch = useDispatch()
    const myRef=useRef('myRef')
    function update(){
        let text=myRef.current.value
        props.update(text)
    }
    function addpost(){
        let text=myRef.current.value
        dispatch(sendPost({text:text}))
    }
        return(
        <div className={clasess.createPost}>
            <textarea  className={clasess.textarea} onChange={()=>{update()}} ref={myRef} value={props.new} name="" id="" ></textarea>
            <button className={clasess.button} onClick={()=>{addpost()}}>  add post
            </button>
        </div>
    )

}
export default CreatePost
