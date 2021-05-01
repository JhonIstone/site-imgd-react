import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Header from './componets/header/Header'
import Musicas from './componets/main/musicas/Musicas'
import Fotos from './componets/main/fotos/Fotos'
import Noticias from './componets/main/noticias/Noticias'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Musicas}/> 
                <Route path="/Musicas" component={Musicas}/>
                <Route path="/Fotos" component={Fotos}/>
                <Route path="/Noticias" component={Noticias}/>
            </Switch>
        </BrowserRouter>
    );
}