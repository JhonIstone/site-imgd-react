import './Musicas.css'
import firebase from '../../../fireBaseConnection'
import { useState, useEffect, useContext } from 'react'
import iconClose from '../../../assets/iconClose.png'
import { AuthContext } from '../../../context/auth';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, {
    Pagination, Navigation
} from 'swiper/core';

import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import Header from '../../../componets/header/Header'
import Footer from '../../../componets/footer/footer'
import Music from './musica/PageMusic.js'

import { toast } from 'react-toastify'

SwiperCore.use([Pagination, Navigation]);
export default function Musicas() {

    const { user } = useContext(AuthContext)

    const [allMusics, setAllMusics] = useState([]);

    const [pageMusic, setPageMusic] = useState(false)
    const [musicForPage, setMusicForPage] = useState(null)
    const [lgShow, setLgShow] = useState(false);

    function adjustLink(link) {
        let index
        index = link.indexOf('v=')

        let adjustedLink
        adjustedLink = link.slice(index + 2, index + 13)
        return adjustedLink
    }

    function validateFilds() {
        let title = document.getElementById("formTitle").value
        if (title.length === 0) {
            toast.error('Erro, titulo da musica não pode estar vazio!!');
            return null
        }

        let link = document.getElementById("formLink").value
        if (link.length === 0 || link.search("youtube.com") === -1 || link.length < 15) {
            toast.error('Erro, link informado não é valido!!');
            return null
        }
        link = adjustLink(link)

        let lyric = document.getElementById("formLyric").value
        if (lyric === ' ' || lyric.length < 50) {
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

    async function upNewMusic() {
        let formMusic = validateFilds()

        if (formMusic != null) {
            await firebase.firestore().collection('users').doc(user.uid).collection('userMusics')
                .add({
                    title: formMusic.title,
                    iframe: formMusic.iframe,
                    lyric: formMusic.lyric,
                    album: formMusic.option
                })
                .then(() => {
                    toast.success('Musica foi adicionada com sucesso');
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
        setLgShow(false)
    }

    async function loadMusics() {
        await firebase.firestore().collection("users").doc(user.uid)
        .collection('userMusics')
            .onSnapshot((musicas) => {
                let temp = []; 
                musicas.forEach((musica) => {
                    temp.push({
                        id: musica.id,
                        iframe: musica.data().iframe,
                        lyric: musica.data().lyric,
                        title: musica.data().title,
                        album: musica.data().album
                    })
                })
                setAllMusics(temp.sort((a, b)=>{
                    return a.album > b.album ? -1 : a.album < b.album ? 1 : 0
                }))
            })
    }

    async function remove(id){
        await firebase.firestore().collection("users")
        .doc(user.uid)
        .collection('userMusics')
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
        loadMusics()

        document.querySelector('.navLink.Fotos').classList.remove('Active')
        document.querySelector('.navLink.Novidades').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.add('Active')
    }, []);

    return (
        <div>
            <Header />
            <main className='mainMusics'>
                {!pageMusic ? (
                    <>
                        {allMusics ? (
                            <>
                            <h1>Musicas</h1>
                            {/* Musicas Evolve */}
                            {allMusics.filter((musica) => {
                                if (musica.album === 'evolve')
                                    return true 
                                return false}).length > 0 ?
                                <section>
                                    <div className='headerSection'>
                                        <h1>Evolve</h1>
                                        <Button variant="outline-secondary" onClick={() => setLgShow(true)}>Adiconar Musica</Button>
                                    </div>
                                    <Swiper slidesPerView={3} spaceBetween={60} slidesPerGroup={1} 
                                        loop={true} loopFillGroupWithBlank={true} pagination={{
                                        "clickable": true}} navigation={true} className="mySwiper">
                                    {allMusics.filter((musica) => {
                                        if (musica.album === 'evolve')
                                            return true
                                        return false
                                    }).map((musica) => {
                                        return (
                                            <SwiperSlide>
                                                <div id='cardMusic'>
                                                    <div className='headerCard'> 
                                                        <h4 className='titleMusic' onClick={() => {
                                                            setPageMusic(true)
                                                            setMusicForPage({title: musica.title, 
                                                                lyric: musica.lyric, 
                                                                iframe: musica.iframe, 
                                                                album: musica.album})
                                                            }}>
                                                            {musica.title}
                                                        </h4>
                                                        <img src={iconClose} alt="icon delete" 
                                                        onClick={() => remove(musica.id, "evolve")}></img>
                                                    </div>
                                                    <iframe className='frameMusic' 
                                                        src={`https://www.youtube.com/embed/${musica.iframe}`}
                                                        title="YouTube video player" frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; 
                                                        encrypted-media; gyroscope; picture-in-picture">
                                                    </iframe>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })   
                                    }
                                    </Swiper>
                                </section>
                                :
                                null
                            }

                            {/* Musicas Origins */}
                            {allMusics.filter((musica) => {
                                if (musica.album === 'origins')
                                    return true 
                                return false}).length > 0 ?
                                <section>
                                    <div className='headerSection'>
                                        <h1>Origins</h1>
                                        <Button variant="outline-secondary" 
                                        onClick={() => setLgShow(true)}>Adiconar Musica</Button>
                                    </div>
                                    <Swiper slidesPerView={3} spaceBetween={60} slidesPerGroup={1} 
                                        loop={true} loopFillGroupWithBlank={true} pagination={{
                                        "clickable": true}} navigation={true} className="mySwiper">
                                    {allMusics.filter((musica) => {
                                        if (musica.album === 'origins')
                                            return true
                                        return false
                                    }).map((musica) => {
                                        return (
                                            <SwiperSlide>
                                                <div id='cardMusic'>
                                                    <div className='headerCard'> 
                                                        <h4 className='titleMusic' onClick={() => {
                                                            setPageMusic(true)
                                                            setMusicForPage({title: musica.title, 
                                                                lyric: musica.lyric, 
                                                                iframe: musica.iframe, 
                                                                album: musica.album})
                                                            }}>
                                                            {musica.title}
                                                        </h4>
                                                        <img src={iconClose} alt="icon delete" onClick={() => remove(musica.id, "evolve")}></img>
                                                    </div>
                                                    <iframe className='frameMusic' 
                                                        src={`https://www.youtube.com/embed/${musica.iframe}`}
                                                        title="YouTube video player" frameborder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; 
                                                        encrypted-media; gyroscope; picture-in-picture">
                                                    </iframe>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })   
                                    }
                                    </Swiper>
                                </section>
                                :
                                null
                            }
                            </>
                        )
                        :
                        <section className='noneMusics'>
                            <div className='headerSection'>
                                <h1>Voce ainda não tem musicas cadastradas</h1>
                                <Button variant="outline-secondary" onClick={() => setLgShow(true)}>Adiconar Musica</Button>
                            </div>
                        </section>
                        }
                    </>
                )
                    :
                    <Music title={musicForPage.title} lyric={musicForPage.lyric} iframe={musicForPage.iframe}
                        album={musicForPage.album} onClose={() => setPageMusic(false)} />
                }
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
                                <Form.Control id='formTitle' type="text" placeholder="Bad Liar" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Link da musica</Form.Label>
                                <Form.Control id='formLink' type="text"
                                    placeholder="https://www.youtube.com/watch?v=k3zimSRKqNw&ab_" />
                            </Form.Group>
                            <Form.Row className="align-items-center">
                                <Form.Label>Album</Form.Label>
                                <Form.Control as="select" className="mr-sm-2" id="inlineFormCustomSelect" custom>
                                    <option value="evolve">Evolve</option>
                                    <option value="origins">Origins</option>
                                    <option value="origins">Night Vision</option>
                                    <option value="origins">Smoke and Mirrors</option>
                                </Form.Control>
                            </Form.Row>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Letra da musica</Form.Label>
                                <Form.Control id='formLyric' type='text' as="textarea" rows={8}
                                    placeholder="Insira a letra da musica" resize='none' />
                            </Form.Group>
                            <Button variant="outline-danger" size="lg" block onClick={() => setLgShow(false)}>Cancelar</Button>
                            <Button variant="outline-success" size="lg" block onClick={() => upNewMusic()}>Adicionar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Footer />
            </main>
        </div>
    )
}