import classes from './Summary.module.css'
import { useSelector } from 'react-redux';

function Summary (props) {
    const name = useSelector(state=>state.profilePage.profileData.name)
    const dateOfBirth = useSelector(state=> state.profilePage.profileData.dateOfBirth)
    const location = useSelector(state=> state.profilePage.profileData.location)
    const education = useSelector(state=>state.profilePage.profileData.education)
    const work = useSelector(state=>state.profilePage.profileData.work)
    return(
    <div className={classes.content}>
        <img src={props.src}  className={`${classes.content__ava}`} alt="ava" />
        <div className={classes.name}>
            {name} 
        </div>
        <div className={classes.blockWithSummary}>
            <div>
            Date of Birth:{dateOfBirth}  
            </div>
            <div>
                City: {location?.city}
            </div>
            <div>
                Education: {education}
            </div>
            <div>
                Work:" {work}"
            </div>
        </div>
        <button className={classes.button}></button>
    </div>)
}
export default Summary