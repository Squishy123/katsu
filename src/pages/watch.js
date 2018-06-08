import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

import io from 'socket.io-client';

import {Title, Hero, HeroBody, Columns, Column, Button, Subtitle} from 'bloomer';

//components
import EpisodeSummary from '../components/episodeSummary.js';

export default class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animeMeta: {},
            episodeMeta: {},
            currentEpisode: "",
            apiSocket: io('http://localhost:8000/api/edge'),
            nineSocket: io('http://localhost:8000/source/9anime')
        }

        this.loadAnimeMetadata = this.loadAnimeMetadata.bind(this);
        this.loadEpisodeMetadata = this.loadEpisodeMetadata.bind(this);

        this.init = this.init.bind(this);

        this.init();
    }

    async init() {
        await this.loadAnimeMetadata();
        await this.loadEpisodeMetadata();
        await this.buildEpisodeSummary();
    }

    async buildPlayer() {

    }

    buildEpisodeLinks() {
        this.state.apiSocket.emit('anime', {keyword: this.props.match.params.keyword});
        this.state.apiSocket.on(`anime/${this.props.match.params.keyword}`, (res) => {
            if(!res) {
                render((<div><Subtitle>Not on Database</Subtitle>
            <Button onClick={() => this.scrapeAnime()}>Request</Button></div>), document.querySelector('#episodes'));
            }
        })
        /*let episodeLinks = (
        
        )*/
    }

    async buildEpisodeSummary() {
        let currentEpisode = await kitsu.getData(`https://kitsu.io/api/edge/episodes/${this.state.episodeMeta.data[this.props.match.params.episodeNumber].id}`);   
        let episodeSummary = (
            <EpisodeSummary meta={currentEpisode}/>
        )
        render(episodeSummary, document.querySelector('#episodeSummary'));
    }

    async loadAnimeMetadata() {
        let meta = await kitsu.getAnime({id: this.props.match.params.id});
        this.setState({animeMeta: meta});
    }

    async loadEpisodeMetadata() {
        let meta = await kitsu.getData(`${this.state.animeMeta.data.relationships.episodes.links.self}`);
        meta.data = meta.data.sort((a, b) => {
            return a.id - b.id;
        });
        console.log(meta);
        this.setState({episodeMeta: meta})
    }

    render() {
        return(
            <div>
                <Hero isColor='info' isSize='medium' style={{padding: "0"}}>
                    <HeroBody style={{paddingTop: "10px", paddingBottom: "10px"}}>
                        <Columns isCentered>
                            <Column id="player"/>
                            <Column id="episodes"/>
                        </Columns>
                    </HeroBody>
                </Hero>
                <Columns isCentered>
                    <Column id='episodeSummary'/>
                </Columns>
            </div>
        )
    }
}