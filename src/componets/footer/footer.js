import Logo from '../../assets/logo.png'
import GitHub from '../../assets/github.png'
import Linkedin from '../../assets/linkedin.png'
import Instagram from '../../assets/instagram.png'
import './footer.css'

export default function footer(){
    return (
        <div className='footerContainer'>
            <div className='leftFooter'>
                <p><img src={Logo} alt='Logo site' className='logoFooter'/></p>
                <p className='copyright'>&copy; Copyright 2021, João Pedro</p>
            </div>
            <div className='rightFooter'>
                <div className='containerRede'> 
                    <img src={Linkedin} alt='Logo Linkedin' className='logoRedes'/> 
                    <p> <a className='link' href='https://www.linkedin.com/in/pedro-joao/' target='_blank'> predo-joao </a></p> 
                </div>
                <div className='containerRede'> 
                    <img src={GitHub} alt='Logo GitHub' className='logoRedes'/> 
                    <p> <a className='link' href='https://github.com/Jhonistone' target='_blank'> JhonIstone </a></p> 
                </div>
                <div className='containerRede'> 
                    <img src={Instagram} alt='Logo Instagram' className='logoRedes'/> 
                    <p> <a className='link' href='https://instagram.com/jhon_istone' target='_blank'> jhon_istone </a></p> 
                </div>
            </div>
        </div>
    )
}