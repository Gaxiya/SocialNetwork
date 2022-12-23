import React from "react"
import ava from "../../../images/zeroAva.png"
import clasess from './user.module.css'
import { NavLink } from 'react-router-dom';

class User extends React.Component{

    constructor(props){
        super(props);
        this.props=props
        this.followed=props.followed.some(user => user.profileId ===`${this.props.id}`)
        this.follows=this.follows.bind(this)
        this.unfollows=this.unfollows.bind(this)
    }
    componentDidMount(){
        this.followed=this.props.followed.some(user => user.profileId ===`${this.props.id}`)
    }
    componentDidUpdate(){
        this.followed=this.props.followed.some(user => user.profileId ===`${this.props.id}`)
        
    }
    follows(){
        this.props.follow({profileName:this.props.name,profileId:this.props.id})
    }
    unfollows(){
        this.props.unFolow({profileName:this.props.name,profileId:this.props.id})
    }
    render()
    {return(
    <div className={clasess.user}> 
        <div className={clasess.follow}>
            <img src={ava} alt="Ava" />
            <div>
            {this.followed
            ?<button onClick={this.unfollows} className={clasess.button}>
                UnFollow
            </button>
            :<button onClick={this.follows} className={clasess.button}>
                Follow
            </button>
            }
            </div>
        </div>
        <div className={clasess.who}>
            <div className={clasess.left}>
            <NavLink to={`/dialogs/${this.props.id}`}  className={`${clasess.link} ${({ isActive })=> isActive ? `${clasess.active}`:''} `} >
                {this.props.name}
            </NavLink>
            <p className={clasess.status}>{`${this.props.status?this.props.status:""}`}</p>
            </div>
            <div className={clasess.location}>{`${this.props?.location?.city?this.props.location.city:''}
            ${this.props?.location?.country?this.props.location.country:''}`}</div>
        </div>
    </div>
    )
    }
}
export default User