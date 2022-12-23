import logo from '../../images/Logo.png';
import clasess from'./Header.module.css';
import StyledButton from './StyledButton';
function Header (props) {
      if(props.status==='succeeded'||props.statusRefresh==='succeeded'){
        return(
          <header className={clasess.header}>
          <img src={logo} className="App-logo"  alt="logo" />
          <StyledButton onClick={()=>{props.logout()}}>Logout</StyledButton>
      </header>)
        }
   
}
export default Header

