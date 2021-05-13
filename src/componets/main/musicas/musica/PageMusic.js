import './PageMusic.css'

export default function PageMusic(props) {
    return (
        <main className='pageMusic'>
            <section className='infos-music'>
                <iframe className='frameMusic'
                    src={`https://www.youtube.com/embed/${props.iframe}`}
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture">
                </iframe>
                <p>{props.title}</p>
                <p>{props.album}</p>
            </section>
            <section className='lyric-music'>
                <p>{props.lyric}</p>
            </section>
        </main>
    )
}
