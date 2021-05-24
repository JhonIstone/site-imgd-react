import './Fotos.css'
import {useState, useEffect} from 'react'
import Seta from '../../../assets/seta.png'
import firebase from '../../../fireBaseConnection'

import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import {toast} from 'react-toastify'

import Header from '../../header/Header'
import Footer from '../../footer/footer'

export default function Fotos(){
    const [lgShow, setLgShow] = useState(false);
    const [allImages, setAllImages] = useState([]);
    
    async function getUrlImages(){
        await firebase.firestore().collection("imagens")
        .onSnapshot((urlImages) => {
            let temp = []; 
            urlImages.forEach((url) =>{
                temp.push({
                    link: url.data().link
                })
            })
            setAllImages(temp)
        })
    }

    async function upUrlImages(url){
        await firebase.firestore().collection("imagens")
        .add({
            link: url
        })
        .then(() => {
            toast.success("Foto adicionada com sucesso")
        })
        .catch((error) => {
            toast.error(error)
        })
    }
    const upNewFoto = async(e)=>{
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref("galeria")
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)

        upUrlImages(await fileRef.getDownloadURL())
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        setLgShow(false)
    }
    useEffect(()=>{
        document.querySelector('.navLink.Fotos').classList.add('Active')
        document.querySelector('.navLink.Novidades').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.remove('Active')

        getUrlImages()
    }, [])

    return (
        <div>
            <Header/>
            <main>
                <div id='buttonGroup' className="buttonGroup">
                    <Button variant="dark" onClick={() => setLgShow(true)}>Adiconar Foto</Button>
                </div>
                <section className='galery'>
                {allImages.map((image) => {
                    return (
                        <div className='cardImage'>
                            <img src={image.link} alt="Imagem" className='image'/>
                        </div>
                    )
                })    
                }
                </section>

                <div className='scrollTop'>
                    <a href='#buttonGroup'>
                        <img className='seta' src={Seta} alt='setaUp'/>
                    </a>
                </div>
                <Modal size="md" show={lgShow}
                    onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">Nova Foto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group>
                                <Form.File id="exampleFormControlFile1" label="Selecione a foto" 
                                onChange={upNewFoto} accept="image/*"/>
                            </Form.Group>
                            <Button variant="outline-danger" size="lg" block onClick={() => setLgShow(false)}>Cancelar</Button>
                            <Button variant="outline-success" size="lg" block type="submit">Adicionar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </main>
            <Footer/>
        </div>
    )
}