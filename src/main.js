import React from 'react'
import { Switch, Route } from 'react-router-dom'

//components
import SideMenu from './components/sideMenu.js'
import TopMenu from './components/topMenu.js'

//pages
import Home from './pages/home.js'
import Anime from './pages/anime.js'
import Redirect from './pages/redirect.js'

const AnimeRouter = (props) => {
    return (
        <Anime {...props}/>
    )
}

const Main = () => (
    <div id="outer-container" style={{height: "100%", overflow: "hidden"}}>
        <SideMenu/>
        <TopMenu/>
        <main id="page-wrap">
            <div style={{padding: "0 0 100px 0", marginTop: "75px"}}>
                <Switch>
                    <Route exact path ='/' component = {Home}/>
                    <Route exact path ='/animes/:id/:keyword' component = {AnimeRouter}/>
                    <Route component={Redirect}/>
                </Switch>
            </div>
        </main>
    </div>
)

export default Main