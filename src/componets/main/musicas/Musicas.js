import './Musicas.css'
import firebase from '../../../fireBaseConnection'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Music from './musica/PageMusic.js'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, {
    Pagination,Navigation
} from 'swiper/core';

import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

SwiperCore.use([Pagination,Navigation]);
export default function Musicas(){  

    const [allMusicsOrigins, setAllMusicOrigins] = useState([]);
    const [allMusicsEvolve, setAllMusicEvolve] = useState([]);

    const [pageMusic, setPageMusic] = useState(false)
    const [musicForPage, setMusicForPage] = useState(null)
    const [lgShow, setLgShow] = useState(false);

    function adjustLink(link){
        let index
        index = link.indexOf('v=')

        let adjustedLink
        adjustedLink = link.slice(index+2, index+13)
        return adjustedLink
    }
    async function upNewMusic(){
        var title = document.getElementById("formTitle").value
        var link = document.getElementById("formLink").value
        link = adjustLink(link)
        var lyric = document.getElementById("formLyric").value
        var option = document.getElementById("inlineFormCustomSelect").value

        await firebase.firestore().collection(option)
        .add({
            curtidas: 0,
            title: title,
            iframe: link,
            lyric: lyric
        })
        .catch((error) => {
            alert(error)
        })
        setLgShow(false)
    }
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

    useEffect(() => {
        loadMusics('origins')
        loadMusics('evolve')

        document.querySelector('.navLink.Fotos').classList.remove('Active')
        document.querySelector('.navLink.Novidades').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.add('Active')
    }, []);

    return (
        <main className='mainMusics'>
            {pageMusic ? (
                <Music title={musicForPage.title} lyric={musicForPage.lyric} iframe={musicForPage.iframe} 
                album={musicForPage.album} onClose={() => setPageMusic(false)}/>
                ) 
                :
                <>
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
                                            <div id='cardMusic'>
                                                <h4 className='titleMusic' onClick={() => {
                                                    setPageMusic(true)
                                                    setMusicForPage({title: allMusicsEvolve.title, 
                                                        lyric: allMusicsEvolve.lyric, 
                                                        iframe: allMusicsEvolve.iframe, 
                                                        album: 'evolve'})
                                                    }}>
                                                    {allMusicsEvolve.title}
                                                </h4>
                                                <iframe className='frameMusic' 
                                                    src={`https://www.youtube.com/embed/${allMusicsEvolve.iframe}`}
                                                    title="YouTube video player" frameborder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; 
                                                    encrypted-media; gyroscope; picture-in-picture">
                                                </iframe>
                                                <p>{allMusicsEvolve.curtidas} Curtidas</p>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })
                            }
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
                                            <div id='cardMusic'>
                                                <h4 className='titleMusic' 
                                                    onClick={() => {
                                                    setPageMusic(true)
                                                    setMusicForPage({title: allMusicsOrigins.title, 
                                                        lyric: allMusicsOrigins.lyric, 
                                                        iframe: allMusicsOrigins.iframe, 
                                                        album: 'origins'})
                                                    }
                                                }>
                                                    {allMusicsOrigins.title}
                                                </h4>
                                                <iframe className='frameMusic' src={`https://www.youtube.com/embed/${allMusicsOrigins.iframe}`}
                                                    title="YouTube video player" frameborder="0" 
                                                    allow="accelerometer; autoplay; clipboard-write; 
                                                    encrypted-media; gyroscope; picture-in-picture">
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
                                    <Form.Control id='formTitle' type="text" placeholder="Bad Liar" required/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Link da musica</Form.Label>
                                    <Form.Control id='formLink' type="text" 
                                    placeholder="https://www.youtube.com/watch?v=k3zimSRKqNw&ab_" required/>
                                </Form.Group>
                                <Form.Row className="align-items-center">
                                    <Form.Label>Album</Form.Label>
                                    <Form.Control as="select" className="mr-sm-2" id="inlineFormCustomSelect" custom required>
                                            <option value="evolve">Evolve</option>
                                            <option value="origins">Origins</option>
                                    </Form.Control>
                                </Form.Row>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Letra da musica</Form.Label>
                                    <Form.Control id='formLyric' as="textarea" rows={8} 
                                    placeholder="Insira a letra da musica" resize='none' required/>
                                </Form.Group>
                                <Button variant="outline-danger" size="lg" block onClick={() => setLgShow(false)}>Cancelar</Button>
                                <Button variant="outline-success" size="lg" block onClick={() => upNewMusic()}>Adicionar</Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            }
        </main>
    )
}