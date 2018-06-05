import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

import MediaCard from '../components/mediaCard.js';

 class Anime extends React.Component {
    constructor(props) {
        super(props);
    }

    async loadResults() {
        let items = await kitsu.getAnime({id: this.props.match.params.id});
        let meta = (
        <div>
            <img className="poster" src={items.data.attributes.posterImage.small}></img>
            <h1 className="display">{items.data.attributes.canonicalTitle}</h1>
        </div>);
        render(meta, document.querySelector('#metadata'))
    }


    render() {
       this.loadResults();
        return (
            <div className="jumbotron">
                <div id="metadata">
                </div>
            </div>
        );
    }
}

export default Anime;