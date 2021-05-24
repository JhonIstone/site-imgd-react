import React from 'react'
import { Switch } from "react-router-dom";

import Musicas from '../componets/main/musicas/Musicas'
import Fotos from '../componets/main/fotos/Fotos'
import Noticias from '../componets/main/noticias/Noticias'
import Login from '../componets/login/Login'
import Register from '../componets/cadastro/Register'
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
