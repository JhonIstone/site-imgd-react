import './Musicas.css'
import { Button } from 'react-bootstrap'
import firebase from '../../../fireBaseConnection'
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import SwiperCore, {
    Pagination,Navigation
  } from 'swiper/core';

SwiperCore.use([Pagination,Navigation]);

export default function Musicas(){  

    const [allMusicsOrigins, setAllMusicOrigins] = useState([]);
    const [allMusicsEvolve, setAllMusicEvolve] = useState([]);

    const [lgShow, setLgShow] = useState(false);
    
    useEffect(() => {
        async function loadMusics(album) {
            await firebase.firestore().collection(album)
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
                if(album === 'evolve')
                    setAllMusicEvolve(temp)
                else if (album === 'origins')
                    setAllMusicOrigins(temp);
            })
        }
        loadMusics('origins')
        loadMusics('evolve')

        document.querySelector('.navLink.Fotos').classList.remove('Active')
        document.querySelector('.navLink.Novidades').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.add('Active')
    }, []);

    return (
        <main className='mainMusics'>
            {/* List Musics Album Evolve */}
            <section className='evolve'>
                <div className='headerSection'>
                    <h1>Evolve</h1>
                    <Button variant="outline-secondary" onClick={() => setLgShow(true)}>Adiconar Musica</Button>
                </div>
                <Swiper slidesPerView={3} spaceBetween={60} slidesPerGroup={1} 
                loop={true} loopFillGroupWithBlank={true} pagination={{
                "clickable": true}} navigation={true} className="mySwiper">
                    {allMusicsEvolve.map((allMusicsEvolve) => {
                        return (
                            <SwiperSlide>
                                <div>
                                    <h4 className='titleMusic'>{allMusicsEvolve.title.toUpperCase()}</h4>
                                    <iframe className='frameMusic' src={`https://www.youtube.com/embed/${allMusicsEvolve.iframe}`}
                                        title="YouTube video player" frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; 
                                        encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen>
                                    </iframe>
                                    <p>{allMusicsEvolve.curtidas} Curtidas</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>
            
            {/* List Musics Album Origins */}
            <section className='origin'>
                <div className='headerSection'>
                    <h1>Origin</h1>
                    <Button variant="outline-secondary" onClick={() => setLgShow(true)}>Adiconar Musica</Button>
                </div>
                <Swiper slidesPerView={3} spaceBetween={60} slidesPerGroup={1} 
                loop={true} loopFillGroupWithBlank={true} pagination={{
                "clickable": true}} navigation={true} className="mySwiper">
                    {allMusicsOrigins.map((allMusicsOrigins) => {
                        return (
                            <SwiperSlide>
                                <div>
                                    <h4 className='titleMusic'>{allMusicsOrigins.title.toUpperCase()}</h4>
                                    <iframe className='frameMusic' src={`https://www.youtube.com/embed/${allMusicsOrigins.iframe}`}
                                        title="YouTube video player" frameborder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; 
                                        encrypted-media; gyroscope; picture-in-picture" 
                                        allowfullscreen>
                                    </iframe>
                                    <p>{allMusicsOrigins.curtidas} Curtidas</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </section>
            
            {/* MODAL */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Nova Musica</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Titulo da musica</Form.Label>
                        <Form.Control type="text" placeholder="Bad Liar" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Link da musica</Form.Label>
                        <Form.Control type="text" placeholder="https://www.youtube.com/watch?v=k3zimSRKqNw&ab_"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Letra da musica</Form.Label>
                        <Form.Control as="textarea" rows={8} placeholder="Insira a letra da musica"/>
                    </Form.Group>
                </Form>
                </Modal.Body>
            </Modal>
        </main>
    )
}