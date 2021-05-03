import './Musicas.css'
import { Button } from 'react-bootstrap'
import firebase from '../../../fireBaseConnection'
import {useState, useEffect  } from 'react'
import ModalMusicas from './ModalMusicas'

export default function Musicas(){  

    const [musics, setMusic] = useState([]);
    const [isactiveModal, setActiveModal] = useState(false);

    useEffect(() => {
        async function loadPosts() {
            await firebase.firestore().collection('musicas')
                .onSnapshot((musicas) => {
                    let temp = [];
                    musicas.forEach((musicas) => {
                        temp.push({
                            id: musicas.id,
                            titulo: musicas.data().titulo,
                            frame: musicas.data().frame,
                            lyric: musicas.data().lyric,
                            curtidas: musicas.data().curtidas
                        })
                    })
                    setMusic(temp);
                })
        }
        loadPosts();
    }, []);

    return (
        <main className='mainMusics'>
            <h1 className='titleMusics'>Ouça, compartilhe e curta suas musicas favoritas da banda</h1>
            <div className='groupButtons'>
                <Button variant="outline-secondary" onClick={() => setActiveModal(true)}>Nova Musica</Button>
                {isactiveModal === true ? 
                <ModalMusicas onClose={() => setActiveModal(false)}> 
                <h1>FOI</h1>
                </ModalMusicas> : null}
            </div>
            <section className='musics'>
                {musics.map((musics) => {
                    return (
                        <div className='cardMusic'>
                            <h3 className='titleMusic'>{musics.title}</h3>
                            <iframe className='frameMusic' src={musics.frame} 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                            <p className='lyrics'>
                                {musics.lyric}
                            </p>
                            <p className='curtidas'>{musics.curtidas}</p>
                        </div>
                    );
                })}
            </section>
        </main>
    )
}