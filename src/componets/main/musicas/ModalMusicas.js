import './modal.scss'
import React from 'react'
import { Button } from 'react-bootstrap';
import {useState} from 'react'
import firebase from '../../../fireBaseConnection'
import { Toast } from 'bootstrap';

const ModalMusicas = ({onClose = () => {}}) => {

    const [musica, setMusica] = useState()

    async function addMusica(){
            const title = document.getElementById('txtTitle').value
            const frame = document.getElementById('txtUrl').value
            const lyric = document.getElementById('txtLyric').value
        setMusica({
            curtidas: 0,
            title: document.getElementById('txtTitle').value,
            frame: document.getElementById('txtUrl').value,
            lyric: document.getElementById('txtLyric').value
        })

        await firebase.firestore().collection('musicas')
            .add({
                curtidas: musica.curtidas,
                title: musica.title,
                frame: musica.frame,
                lyric: musica.lyric
            })
            .then(()=>{
                Toast.success('Musica adicionada com sucesso');
            })
            .cathc((error)=>{
                Toast.error('Erro ao adicionar a musica');
            })
    }
  
    return (
        <div className='modalAdc'>
            <div id='container'>
                <form className='formADC'>
                    <label for='txtTitle'>Titulo da Musica</label>
                    <input type='text' id='txtTitle' className='txtTitle' placeholder='Follow You' required></input>
                    <label for='txtUrl'>Link da musica</label>
                    <input type='url' id='txtUrl' className='txtUrl' placeholder='youtube.com/watch?v=WMBAa-jObC4ab' required></input>
                    <label for='txtLyric'>Letra da musica</label>
                    <textarea type='text-area' id='txtLyric' className='txtLyric' rows='10' placeholder='Utilize / para as quebras de linha' required></textarea>
                    <div className='group-buttons'>
                        <Button variant="danger" size="lg" onClick={onClose} className='btncancelar'>Cancelar</Button>
                        <Button variant="success" size="lg" className='btnadicionar' onClick={() => addMusica()}>Adicionar</Button>{' '}
                    </div>
                </form>
            </div>
        </div>   
    )
}
export default ModalMusicas;