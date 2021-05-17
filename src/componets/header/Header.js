import './header.css'
import { Link, NavLink } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Nav from 'react-bootstrap/Nav'
import BackgroundHeader from '../../assets/back.png'
import Logo from '../../assets/logo.png'

export default function Header() {
    return (
        <header className='container-header'>
            {/* Barra de menu */}
            <Nav className='justify-content-end' variant="pílulas" defaultActiveKey="/">
                <Link to="/Musicas" className='logoHeader'>
                    <img src={Logo} alt='Logo site' className='logoHeader'>
                    </img>
                </Link>
                <Nav.Item>
                    <NavLink className='nav-link' to="/Musicas" eventKey="link-1">
                        <Link to="/Musicas" className='navLink Musicas'>Musicas</Link>
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className='nav-link' to="/Fotos" eventKey="link-2">
                        <Link to="/Fotos" className='navLink Fotos'>Fotos</Link>
                    </NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink className='nav-link' to="/Noticias" eventKey="link-3">
                        <Link to="/Noticias" className='navLink Novidades'>Novidades</Link>
                    </NavLink>
                </Nav.Item>
            </Nav>
            {/*Fim Barra de menu */}

            {/* Carosel Header */}
            <Carousel>
                <Carousel.Item interval={10000}>
                    <img
                        className="d-block w-100"
                        src={BackgroundHeader}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1>OUÇA, COMPARTILHE E CURTA SUAS MUSICAS</h1>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={10000}>
                    <img
                        className="d-block w-100"
                        src={BackgroundHeader}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h1>AS NOVIDADES DA SUA BANDA FAVORITA VOCE VÊ PRIMEIRO AQUI</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/* Fim Carosel Header */}
        </header>
    )
}