import {useState, useEffect} from 'react'
import './Noticias.css'

export default function Noticias(){

    useEffect(()=>{
        document.querySelector('.navLink.Fotos').classList.remove('Active')
        document.querySelector('.navLink.Novidades').classList.add('Active')
        document.querySelector('.navLink.Musicas').classList.remove('Active')
    })
    return (
        <h1>POTIVIS3</h1>
    )
}