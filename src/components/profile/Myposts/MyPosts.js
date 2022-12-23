import clasess from'./MyPosts.module.css';
import Post from './Post/Post';

const MyPosts= (props) =>{
    
    return(<div className={`${clasess.content}`}>
    {props.post.map((post)=>{
        return <Post key={props.post.indexOf(post).toString()}  text={` ${post.text}` }/>
    })}
    </div>)
}
export default MyPosts