import './index.scss'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

const Home = () => {

    return(
        <div className='home-container'>
            <div className='content'>
                <h1 className='title'>Welcome to DiveLog</h1>
                <p>An easy App for new divers who might want to keep up to date reacreatinal logs <br /> and build up their portfolio of logged dives.</p>
                <Link to='login' className='login-link'><span></span>TRY IT NOW!</Link>
            </div>
            <div className='socialMedia-container'>
                <InstagramIcon 
                    className='icon'
                    onClick={() => {alert('Account in process')}}
                />
                <FacebookIcon 
                    className='icon'
                    onClick={() => {alert('Account in process')}}
                />
                <TwitterIcon 
                    className='icon'
                    onClick={() => {alert('Account in process')}}
                />
                <EmailIcon 
                    className='icon'
                    onClick={() => {alert('Account in process')}}
                />
            </div>
        </div>
    )
}

export default Home