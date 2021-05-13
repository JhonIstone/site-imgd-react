import React from 'react';
import {
    Switch,
    Route
  } from "react-router-dom";

import Header from './componets/header/Header.js'
import Footer from './componets/footer/footer.js'

import Musicas from './componets/main/musicas/Musicas'
import Noticias from './componets/main/noticias/Noticias'
import Fotos from './componets/main/fotos/Fotos'

function App(){
    return(
        <div>
            <Header/>
            <Switch>
                <Route exact path="/">
                    <Musicas/>
                </Route>
                <Route exact path="/Musicas">
                    <Musicas/>
                </Route>
                <Route path="/Noticias">
                    <Noticias/>
                </Route>
                <Route path="/Fotos">
                    <Fotos/>
                </Route>
            </Switch>
            <Footer/>
        </div>
    )
}

export default App;