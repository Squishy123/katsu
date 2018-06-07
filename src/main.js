import React from 'react'
import { Switch, Route } from 'react-router-dom'

//components
import SideMenu from './components/sideMenu.js'
import TopMenu from './components/topMenu.js'

//pages
import Home from './pages/home.js'
import Anime from './pages/anime.js'
import Redirect from './pages/redirect.js'
import Search from './pages/search.js'
import Watch from './pages/watch.js'


const AnimeRouter = (props) => {
    return (
        <Anime {...props}/>
    )
}

const SearchRouter = (props) => {
    return(
        <Search {...props}/>
    )
}

const WatchRouter = (props) => {
    return(
        <Watch {...props}/>
    )
}

const Main = () => (
    <div id="outer-container" style={{height: "100%", overflow: "hidden"}}>
        <SideMenu/>
        <TopMenu/>
        <main id="page-wrap">
            <div style={{padding: "75px 0 100px 0"}}>
                <Switch>
                    <Route exact path ='/' component = {Home}/>
                    <Route exact path ='/animes/:id/:keyword/' component = {AnimeRouter}/>
                    <Route exact path ='/animes/:id/:keyword/:tab' component = {AnimeRouter}/>
                    <Route exact path ='/animes/:id/:keyword/:tab/:episodeNumber' component = {AnimeRouter}/>

                    <Route exact path='/animes/:id/:keyword/episodes/watch/:source/:episodeNumber' component = {WatchRouter}/>

                    <Route exact path='/search/:keyword' component={SearchRouter}/>
                    <Route component={Redirect}/>
                </Switch>
            </div>
        </main>
    </div>
)

export default Main