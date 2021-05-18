import './Musicas.css'
import firebase from '../../../fireBaseConnection'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Music from './musica/PageMusic.js'
import iconClose from '../../../assets/iconClose.png'

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


import {toast} from 'react-toastify'

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

    function validateFilds(){
        let title = document.getElementById("formTitle").value
        if (title.length === 0){
            toast.error('Erro, titulo da musica não pode estar vazio!!');
            return null
        }

        let link = document.getElementById("formLink").value
        if (link.length === 0 || link.search("youtube.com") === -1 || link.length < 15){
            toast.error('Erro, link informado não é valido!!');
            return null
        }
        link = adjustLink(link)

        let lyric = document.getElementById("formLyric").value
        if (lyric === ' ' || lyric.length < 50){
            toast.error('Erro com a letra da musica!!');
            return null
        }

        let option = document.getElementById("inlineFormCustomSelect").value

        const music = {
            option: option,
            title: title,
            iframe: link,
            lyric: lyric
        }
        
        return music
    }

    async function upNewMusic(){
        let formMusic = validateFilds()

        if (formMusic != null){
            await firebase.firestore().collection(formMusic.option)
            .add({
                curtidas: 0,
                title: formMusic.title,
                iframe: formMusic.iframe,
                lyric: formMusic.lyric
            })
            .then(() =>{
                toast.success('Musica foi adicionada com sucesso');
            })
            .catch((error) => {
                toast.error(error);
            })
        }
        setLgShow(false)
    }

    async function loadMusics(album) {
        await firebase.firestore().collection(album)
        .onSnapshot((music) => {
            let temp = []; 
            music.forEach((music) => {
                temp.push({
                    id: music.id,
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

    async function remove(id, album){
        await firebase.firestore().collection(album)
        .doc(id)
        .delete()
        .then(() => {
            toast.sucess("Apagado")
        })
        .catch((error) => {
            toast.error(error)
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
                                                <div className='headerCard'> 
                                                    <h4 className='titleMusic' onClick={() => {
                                                        setPageMusic(true)
                                                        setMusicForPage({title: allMusicsEvolve.title, 
                                                            lyric: allMusicsEvolve.lyric, 
                                                            iframe: allMusicsEvolve.iframe, 
                                                            album: 'evolve'})
                                                        }}>
                                                        {allMusicsEvolve.title}
                                                    </h4>
                                                    <img src={iconClose} alt="icon delete" onClick={() => remove(allMusicsEvolve.id, "evolve")}></img>
                                                </div>
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
                                            <div className='headerCard'> 
                                                    <h4 className='titleMusic' onClick={() => {
                                                        setPageMusic(true)
                                                        setMusicForPage({title: allMusicsOrigins.title, 
                                                            lyric: allMusicsOrigins.lyric, 
                                                            iframe: allMusicsOrigins.iframe, 
                                                            album: 'evolve'})
                                                        }}>
                                                        {allMusicsOrigins.title}
                                                    </h4>
                                                    <img src={iconClose} alt="icon delete" onClick={() => remove(allMusicsOrigins.id, "origins")}></img>
                                                </div>
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
                                    <Form.Control id='formTitle' type="text" placeholder="Bad Liar"/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Link da musica</Form.Label>
                                    <Form.Control id='formLink' type="text" 
                                    placeholder="https://www.youtube.com/watch?v=k3zimSRKqNw&ab_"/>
                                </Form.Group>
                                <Form.Row className="align-items-center">
                                    <Form.Label>Album</Form.Label>
                                    <Form.Control as="select" className="mr-sm-2" id="inlineFormCustomSelect" custom>
                                            <option value="evolve">Evolve</option>
                                            <option value="origins">Origins</option>
                                    </Form.Control>
                                </Form.Row>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Letra da musica</Form.Label>
                                    <Form.Control id='formLyric' type='text' as="textarea" rows={8} 
                                    placeholder="Insira a letra da musica" resize='none'/>
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