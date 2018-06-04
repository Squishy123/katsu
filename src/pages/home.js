import React from 'react';
import { render } from 'react-dom';
import styles from './home.css';
import * as kitsu from '../scripts/kitsu-api.js'

import MediaCard from '../components/mediaCard.js';

class Home extends React.Component {

    constructor(props) {
        super(props);
    } 

    async loadTrending() {
        let items = await kitsu.getTrending();
        let mediaList = items.data.map((e) => {
           return <MediaCard meta={e}/>
        });
        render(mediaList, document.querySelector('#recentAnime'))
        //console.log(items)
    }

    render() {
        this.loadTrending();
        return (<div>
                <div class="jumbotron" id="versionInfo">
                    <h1>Katsu - Streaming</h1>
                    <p>Version: Hello Kitty World!</p>
                </div>
                <div class="jumbotron" id="recentAnime">
                    <h3>Recent Anime</h3>
                    
                </div>
            </div>)
    }

}
    

export default Home;