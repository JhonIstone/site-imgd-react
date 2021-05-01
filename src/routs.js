import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from './componets/header/Header'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                {/* <Route exact path="/Musicas" component={}/> */}
            </Switch>
        </BrowserRouter>
    );
}