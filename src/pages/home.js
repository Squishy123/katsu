import React from 'react';
import { render } from 'react-dom';
import styles from './home.css';
import * as kitsu from '../scripts/kitsu-api.js'

import MediaCard from '../components/mediaCard.js';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recentAnime: [<h3>Recent Anime</h3>]
        }
    } 

    async loadTrending() {
        let items = await kitsu.getTrending();
        let mediaList = items.data.map((e) => {
           return <MediaCard meta={e}/>
        });
        this.state.recentAnime.push(<div class="mediaList">{mediaList}</div>)
        render(this.state.recentAnime, document.querySelector('#recentAnime'))
    }

    render() {
        this.loadTrending();
        return (<div>
                <div className="jumbotron" id="versionInfo">
                    <h1>Katsu - Streaming</h1>
                    <p>Version: Hello Kitty World!</p>
                </div>
                <div className="jumbotron" id="recentAnime">
                </div>
            </div>)
    }

}
    

export default Home;