import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import Musicas from './componets/main/musicas/Musicas'
import Fotos from './componets/main/fotos/Fotos'
import Noticias from './componets/main/noticias/Noticias'

export default function mainRoutes() {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<Musicas/>}/> 
                <Route path="/Musicas" element={<Musicas/>}/>
                <Route path="/Fotos" element={<Fotos/>}/>
                <Route path="/Noticias" element={<Noticias/>}/>
            </Switch>
        </Router>
    );
}
