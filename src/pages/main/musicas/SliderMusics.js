import React from 'react'
import iconClose from '../../../assets/iconClose.png'

import { Button } from 'react-bootstrap'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import SwiperCore, {
    Pagination, Navigation
} from 'swiper/core';
SwiperCore.use([Pagination, Navigation]);


function SliderMusics(props){
    const musicas = props.musicas

    return (
        <section className='evolve'>
            <div className='headerSection'>
                <h1 className='titleAlbum'>{musicas[0].album}</h1>
                <Button variant="outline-secondary" onClick={() => props.setLgShow(true)}>Adiconar Musica</Button>
            </div>
            <Swiper slidesPerView={3} spaceBetween={60} slidesPerGroup={1} 
            loop={true} loopFillGroupWithBlank={true} pagination={{
            "clickable": true}} navigation={true} className="mySwiper">
                {musicas.map((musica) => {
                        return (
                            <SwiperSlide>
                                <div id='cardMusic'>
                                    <div className='headerCard'> 
                                        <h4 className='titleMusic' onClick={() => {
                                            props.setPageMusic(true)
                                            props.setMusicForPage({title: musica.title, 
                                                lyric: musica.lyric, 
                                                iframe: musica.iframe, 
                                                album: 'evolve'})
                                            }}>
                                            {musica.title}
                                        </h4>
                                        <img src={iconClose} alt="icon delete" onClick={() => props.remove(musica.id)}></img>
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
    )
}
export default SliderMusics

