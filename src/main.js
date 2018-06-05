import React from 'react'
import { Switch, Route } from 'react-router-dom'

//components
import SideMenu from './components/sideMenu.js'
import TopMenu from './components/topMenu.js'

//pages
import Home from './pages/home.js'
//import Redirect from './pages/redirect.js'

const Main = () => (
    <div id="outer-container" style={{height: "100%", overflow: "hidden"}}>
        <SideMenu/>
        <TopMenu/>
        <main id="page-wrap">
            <div style={{padding: "50px 0 0 100px"}}>
                <Switch>
                    <Route exact path ='/' component = {Home}/>
                    {/*<Route component={Redirect}/>*/}
                </Switch>
            </div>
        </main>
    </div>
)

export default Main