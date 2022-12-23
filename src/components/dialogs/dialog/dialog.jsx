import clasess from'./dialog.module.css';
import {useSelector} from 'react-redux';
import {API_URL} from '../../../htttp/axios'
import { elementSwitch } from './../../../helpers/elementSwitch';
function Dialog (props) {
  const userId=useSelector((state)=>state.profilePage.profileData.id)
  const isMyMessage = userId === props.userId
  let element
  const pathToFile = `${API_URL}/files${props.text}`
  element = elementSwitch(props.type,pathToFile,props.text)
    return(
    <div className={isMyMessage?clasess.Dialog_Me:clasess.Dialog}>
        <div className={clasess.ava} >
            <span>Ava</span>
            {`${isMyMessage?'':props.name}`}
        </div>
        <div className={clasess.text} >
        {element} 
        </div>
    </div>)
}
export default Dialog



