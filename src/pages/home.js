import React from 'react';
import { render } from 'react-dom';
import styles from './home.css';
import * as kitsu from '../scripts/kitsu-api.js'

import MediaCard from '../components/mediaCard.js';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trendingAnime: [<h1 class="display">Trending Anime</h1>]
        }
    } 

    async loadTrending() {
        let items = await kitsu.getTrending();
        let mediaList = items.data.map((e) => {
           return <MediaCard meta={e}/>
        });
        this.state.trendingAnime.push(<div class="mediaList">{mediaList}</div>)
        render(this.state.trendingAnime, document.querySelector('#trendingAnime'))
    }

    render() {
        this.loadTrending();
        return (
            <div>
                <div className="jumbotron" id="trendingAnime">
                </div>
            </div>)
    }

}
    

export default Home;