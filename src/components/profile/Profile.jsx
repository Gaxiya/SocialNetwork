import town from '../../images/town.jpg';
import pes from '../../images/pes.jpg';
import clasess from'./Profile.module.css';
import MyPosts from './Myposts/MyPosts';
import CreatePost from './createPost/createPost';
import Summary from './summaryOfMyProfile/summary';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './../../Redux/reducers/profileReducer';

function Profile (props) {
    const profileStatus= useSelector(state=>state.profilePage.status)
    const dispacth = useDispatch()
    const navigate=useNavigate()
    useEffect(
        () => {
            if(profileStatus==='idle'){
                dispacth(getProfile())
            }
            if(
                props.statusRefresh!=='succeeded'&&props.status!=='succeeded')
                {navigate('/login')}
    })

    return(
    <div className={clasess.content}>
        <img src={town} className={clasess.content__town}  alt="town" />
        <Summary src={pes}/>
        <div className={clasess.headerOfCreator}>My posts</div>
        <CreatePost  update={props.update} new={props.profile.newText} />
        <MyPosts post={props.profile.posts}/>
    </div>)
}
export default Profile