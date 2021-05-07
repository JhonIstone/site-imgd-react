import Logo from '../../assets/logo.png'
import './footer.css'

export default function footer(){
    return (
        <footer>
            <img src={Logo} alt='Logo' className='logoFooter'/>
        </footer>
    )
}