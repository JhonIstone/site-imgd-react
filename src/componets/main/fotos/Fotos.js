import './Fotos.css'
import {useState, useEffect} from 'react'

export default function Fotos(){
    useEffect(()=>{
        document.querySelector('.navLink.Fotos').classList.add('Active')
        document.querySelector('.navLink.Novidades').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.remove('Active')
    })

    return (
        <h1>POTIVIS</h1>
        
    )
}