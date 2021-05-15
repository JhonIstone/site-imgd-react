import './PageMusic.css'
import { Button } from 'react-bootstrap'

export default function PageMusic(props) {
    return (
        <main className='mainPageMusic'>
                <Button className='buttonVoltar' variant="outline-secondary" 
                onClick={() => props.onClose()}>Voltar</Button>
            <div className='pageMusic'>
                <section className='infos-music'>
                    <iframe className='frameMusic'
                        src={`https://www.youtube.com/embed/${props.iframe}`}
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture">
                    </iframe>
                    <p>Nome: {props.title}</p>
                    <p>Album: {props.album}</p>
                </section>
                <section className='lyric-music'>
                    <div className='lyric-div'>
                        <pre>{props.lyric}</pre>
                    </div>
                </section>
            </div>
        </main>
    )
}
