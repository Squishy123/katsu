import React from 'react'
import { Switch, Route } from 'react-router-dom'

//components
import Header from './components/header.js'

//pages
import Home from './pages/home.js'

const Main = () => (
    <main>
        <Header/>
        <Switch>
             <Route exact path ='/' component = {Home}/>
             <Route path ='/page1' component = {Home}/>
             <Route path='/api/:id' component ={Home}/>
        </Switch>
    </main>
)

export default Main