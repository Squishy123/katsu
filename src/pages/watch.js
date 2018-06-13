import React from 'react';
import { render } from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

import io from 'socket.io-client';

import { Title, Hero, HeroBody, Columns, Column, Button, Subtitle } from 'bloomer';

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
        await this.getAnime();
    }

    async buildPlayer() {

    }

    async requestAnime(href, title) {
        this.state.nineSocket.emit('request', { url: href, title: title });
    }

    buildEpisodeLinks() {
        this.state.apiSocket.emit('anime', { keyword: this.props.match.params.keyword });
        this.state.apiSocket.on(`anime/${this.props.match.params.keyword}`, (res) => {
            if (!res) {
                render((<div><Subtitle>Not on Database</Subtitle>
                    <Button onClick={() => this.scrapeAnime()}>Request</Button></div>), document.querySelector('#episodes'));
            }
        })
        /*let episodeLinks = (
        
        )*/
    }

    async buildEpisodeSummary() {
        let currentEpisode = await kitsu.getData(`https://kitsu.io/api/edge/episodes/${this.state.episodeMeta.data[this.props.match.params.episodeNumber - 1].id}`);
        let episodeSummary = (
            <EpisodeSummary meta={currentEpisode} />
        )
        render(episodeSummary, document.querySelector('#episodeSummary'));
    }

    async loadAnimeMetadata() {
        let meta = await kitsu.getAnime({ id: this.props.match.params.id });
        this.setState({ animeMeta: meta });
    }

    async loadEpisodeMetadata() {
        let meta = await kitsu.getData(`${this.state.animeMeta.data.relationships.episodes.links.self}`);
        meta.data = meta.data.sort((a, b) => {
            return a.id - b.id;
        });
        console.log(meta);
        this.setState({ episodeMeta: meta })
    }

    async getAnime() {
        this.state.nineSocket.emit('search/anime', { keyword: this.props.match.params.keyword });
        this.state.nineSocket.on(`search/anime/${this.props.match.params.keyword}`, (res) => {
            this.state.apiSocket.emit(`anime`, { title: res[0][0].title });
            this.state.apiSocket.on(`anime/${res[0][0].title}`, (resu) => {
                if (resu) {
                    if (resu[0].episodes)
                    resu[0].episodes.forEach(e => {
                            this.state.apiSocket.emit(`episode`, { _id: e });
                            this.state.apiSocket.on(`episode/${e}`, (res) => {
                                console.log(res[0].sources[0].player);
                            })
                        });
                } else {
                    console.log(null);
                }
                let rb = (
                    <div>
                        <Button isColor="dark" onClick={() => this.requestAnime(res[0][0].href, res[0][0].title)}>Request</Button>
                        <Button isColor="dark" onClick={() => this.getAnime()}>Watch</Button>
                    </div>
                )

                render(rb, document.querySelector('#player'))
            })
        });
    }

    render() {
        return (
            <div>
                <Hero isColor='info' isSize='medium' style={{ padding: "0" }}>
                    <HeroBody style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                        <Columns isCentered>
                            <Column id="player" />
                            <Column id="episodes" />
                        </Columns>
                    </HeroBody>
                </Hero>
                <Columns isCentered>
                    <Column id='episodeSummary' />
                </Columns>
            </div>
        )
    }
}