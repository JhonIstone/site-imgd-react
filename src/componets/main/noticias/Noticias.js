import firebase from '../../../fireBaseConnection'
import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Noticias.css'

export default function Noticias(){

    const [posts, setPosts] = useState([])
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function adjustLinkTwitter(link) {
        let index
        let adjustedLink
        index = link.indexOf('status')
        adjustedLink = link.slice(index, index+26)
        return adjustedLink
    }

    function adjustLinkInstagram(link) {
        let index
        let adjustedLink
        // if(link.includes('/p/')){
        index = link.indexOf('/p/')
        adjustedLink = link.slice(index+1, index+14)
        // }
        // else{
        //     index = link.indexOf('/reel/')
        //     adjustedLink = link.slice(index+1, index+17)
        // }
        return adjustedLink
    }

    async function upNewPost(){
        let title = document.getElementById('formTitle').value
        let iframe = document.getElementById("formLink").value
        let rede
        if (iframe.includes('instagram')){
            rede = 'insta'
            iframe = adjustLinkInstagram(iframe)
        }
        else if (iframe.includes('twitter')){
            rede = 'twitter'
            iframe = adjustLinkTwitter(iframe)
        }
        
        await firebase.firestore().collection('posts')
        .add({
            title: title,
            iframe: iframe,
            rede: rede
        })
        handleClose()
        window.location.reload();
    }

    async function loadPosts() {
        await firebase.firestore().collection('posts')
        .onSnapshot((posts) => {
            let temp = [];
            posts.forEach((posts) => {
                temp.push({
                    title: posts.data().title,
                    iframe: posts.data().iframe,
                    rede: posts.data().rede
                })
            })
            setPosts(temp)
        })
    }

    function loadScripts(src){
        var script = document.createElement('script')
        script.async = true
        script.src = src

        document.querySelector('body').appendChild(script)
    }

    useEffect(()=>{
        document.querySelector('.navLink.Fotos').classList.remove('Active')
        document.querySelector('.navLink.Musicas').classList.remove('Active')
        document.querySelector('.navLink.Novidades').classList.add('Active')

        loadScripts("https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v10.0")
        loadScripts("https://platform.twitter.com/widgets.js")
        loadScripts("//www.instagram.com/embed.js")
        loadPosts()
    }, [])
    
    return (
        <div>
            <header>
                <div className='headerNovidades'>
                    <h1>As novidades da sua banda favorita:</h1>
                    <Button variant="outline-secondary" onClick={handleShow}>
                        Adicionar
                    </Button>
                </div>
            </header>
            <main id='mainNoticias'>
                {posts.map((post) => {
                    if(post.rede === 'twitter'){
                        return (
                            <div className='post'>
                                <h2>{post.title}</h2>
                                <blockquote class="twitter-tweet">
                                    <a href={`https://twitter.com/idupdatesbra/${post.iframe}?ref_src=twsrc%5Etfw`}/>
                                </blockquote>
                            </div>
                        );
                    }
                    else if (post.rede === 'insta'){
                        return (
                            <div className='post'>
                                <h2>{post.title}</h2>
                                <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink={`https://www.instagram.com/${post.iframe}/?utm_source=ig_embed&amp;utm_campaign=loading`} data-instgrm-version="13">
                                    <a href={`https://www.instagram.com/${post.iframe}/?utm_source=ig_embed&amp;utm_campaign=loading`}/>
                                </blockquote>
                            </div>
                        )
                    }
                })}
            </main>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nova Publicação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Titulo da noticia</Form.Label>
                            <Form.Control id='formTitle' type="text" placeholder="O novo cachorro do ..." required />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Link da musica</Form.Label>
                            <Form.Control id='formLink' type="text"
                                placeholder="https://www.instagram.com/p/COfnOHeNLXH/?utm_source=ig_web_copy_link" required />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button type='submit' variant="outline-success" onClick={() => upNewPost()}>
                            Adicionar
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}