import React from 'react'
import { Switch } from "react-router-dom";

import Musicas from '../pages/main/musicas/Musicas'
import Fotos from '../pages/main/fotos/Fotos'
import Noticias from '../pages/main/noticias/Noticias'
import Login from '../pages/login/Login'
import Register from '../pages/cadastro/Register'
import Route from './Routes'

export default function mainRoutes() {
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Register" component={Register}/> 
            <Route isPrivate exact path="/Musicas" component={Musicas}/>
            <Route isPrivate exact path="/Fotos" component={Fotos}/>
            <Route isPrivate exact path="/Noticias" component={Noticias}/>
        </Switch>
    );
}
