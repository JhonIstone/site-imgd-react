import './header.css';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className='container-header'>
            <div className='header-image'>
                <nav className='menu'>
                    <ul>
                        <li> <Link to="/Musicas" className='link'>Musicas</Link> </li>
                        <li> <Link to="/Fotos" className='link'>Fotos</Link> </li>
                        <li> <Link to="/Noticias" className='link'>Novidades</Link> </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}