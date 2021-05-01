import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className='container-header'>
                <div className='container-menu'>
                    <ul className='menu'>
                        <li> <Link to="/Musicas" className='link'>Musicas</Link> </li>
                        <li> <Link to="/Fotos" className='link'>Fotos</Link> </li>
                        <li> <Link to="/Noticias" className='link'>Novidades</Link> </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}