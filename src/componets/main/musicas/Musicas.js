import './Musicas.css'
import { Button } from 'react-bootstrap'
import firebase from '../../../fireBaseConnection'
import {useState, useEffect  } from 'react'
import ModalMusicas from './ModalMusicas'

export default function Musicas(){  

    const [allMusicsOrigins, setAllMusicOrigins] = useState([]);
    const [allMusicsEvolve, setAllMusicEvolve] = useState([]);
    const [isactiveModal, setActiveModal] = useState(false);
    
    useEffect(() => {
        async function loadMusicsOrigin() {
            await firebase.firestore().collection('origins')
            .onSnapshot((music) => {
                let temp = [];
                music.forEach((music) => {
                    temp.push({
                        curtidas: music.data().curtidas,
                        iframe: music.data().iframe,
                        lyric: music.data().lyric,
                        title: music.data().title
                    })
                })
                setAllMusicOrigins(temp);
            })
        }
        loadMusicsOrigin()

        async function loadMusicsEvolve() {
            await firebase.firestore().collection('evolve')
            .onSnapshot((music) => {
                let temp = []
                music.forEach((music) => {
                    temp.push({
                        curtidas: music.data().curtidas,
                        iframe: music.data().iframe,
                        lyric: music.data().lyric,
                        title: music.data().title
                    })
                })
                setAllMusicEvolve(temp)
            })
        }
        loadMusicsEvolve()

        document.querySelector('.navLink.Fotos').classList.remove('Active')
        document.querySelector('.navLink.Novidades').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.add('Active')
    }, []);

    return (
        <main className='mainMusics'>
            <div className='groupButtons'>
                <Button variant="outline-secondary" onClick={() => setActiveModal(true)}>Nova Musica</Button>
                {isactiveModal === true ? 
                <ModalMusicas onClose={() => setActiveModal(false)}> 
                <h1>FOI</h1>
                </ModalMusicas> : null}
            </div>
            <section className='evolve'>
                <h1>Evolve</h1>
                {allMusicsEvolve.map((allMusicsEvolve) => {
                    return (
                        <div className='cardMusic'>
                            <h3 className='titleMusic'>{allMusicsEvolve.title}</h3>
                            <iframe className='frameMusic' src={`https://www.youtube.com/embed/${allMusicsEvolve.iframe}`}
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                            <p className='lyrics'>
                                {allMusicsEvolve.lyric}
                            </p>
                            <p className='curtidas'>{allMusicsEvolve.curtidas}</p>
                        </div>
                    );
                })}
            </section>

            <section className='origin'>
                <h1>Origin</h1>
                {allMusicsOrigins.map((allMusicsOrigins) => {
                    return (
                        <div className='cardMusic'>
                            <h3 className='titleMusic'>{allMusicsOrigins.title}</h3>
                            <iframe className='frameMusic' src={`https://www.youtube.com/embed/${allMusicsOrigins.iframe}`}
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                            <p className='lyrics'>
                                {allMusicsOrigins.lyric}
                            </p>
                            <p className='curtidas'>{allMusicsOrigins.curtidas}</p>
                        </div>
                    );
                })}
            </section>
        </main>
    )
}