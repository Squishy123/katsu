import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

import { Tile, Modal, ModalCard, ModalCardHeader, ModalCardTitle, Delete, ModalCardBody, ModalCardFooter, ModalBackground, Notification, ModalContent, ModalClose, Card, CardImage, CardContent, Button, Box, Column, Columns, Subtitle, Hero, HeroBody, HeroFooter, Tabs, Container, TabList, Tab, TabLink, Image, Title} from 'bloomer';

import { faFile, faListUl, faComments, faUsers} from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import MediaQuery from 'react-responsive';

import {withRouter} from 'react-router-dom';

//socket
import io from 'socket.io-client';

//import styles from './anime.css'

//import MediaCard from '../components/mediaCard.js';

 class Anime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTabs: {
                summary: true,
                episodes: false,
                cast: false,
                reactions: false
            },
            player: {
                active: false,
                source: ""
            },
            sourceSelect: {
                active: false
            },
            episode: 0,
            socket: io('http://localhost:8000')
        }

        this.openEpisode = this.openEpisode.bind(this);

        this.loadEpisode = this.loadEpisode.bind(this);

        this.openSourceSelect = this.openSourceSelect.bind(this);
        this.closeSourceSelect = this.closeSourceSelect.bind(this);

        this.openPlayer = this.openPlayer.bind(this);

        this.setActiveTab = this.setActiveTab.bind(this);
        if(this.props.match.params.tab)
            if(this.props.match.params.episodeNumber) 
                this.setActiveTab(this.props.match.params.tab, true);
            else 
                this.setActiveTab(this.props.match.params.tab);
         this.loadResults();

              //this is super inefficient and needs to be fixed
        if(this.props.match.params.episodeNumber) {
            this.loadEpisode();
        }
    }

    async loadEpisode() {
        let episodeLinks = await kitsu.getData(`https://kitsu.io/api/edge/anime/${this.props.match.params.id}/relationships/episodes`);
        episodeLinks.data = episodeLinks.data.sort((a, b) => {
            return a.id - b.id;
        })
        let ep = await kitsu.getData(`https://kitsu.io/api/edge/episodes/${episodeLinks.data[this.props.match.params.episodeNumber-1].id}`);
        this.openEpisode(ep)
    }

    openPlayer(episode, src) {
        if(src == "9anime") {
            this.setState({socket: io('http://localhost:8000/source/9anime')})
            this.state.socket.emit('search/anime', {keyword: this.props.match.params.keyword});
            this.state.socket.on(`search/${this.props.match.params.keyword}`, (res) => {
                let player = (
                    <div>
                        res
                    </div>
                )
                render(player, document.querySelector('#centerPanel'))
            })
        }
    }

    openSourceSelect(episode) {
        console.log(episode);
        let sourceSelect = (
            <div>
                <ModalCardHeader>
                    <ModalCardTitle><span style={{fontWeight: 800}}>Choose Source</span></ModalCardTitle>
                </ModalCardHeader>
                <ModalCardBody>
                    <Button onClick={() => {this.closeSourceSelect(); this.openPlayer(episode, "9anime")}}isColor="dark" isSize="large">9anime</Button>
                </ModalCardBody>
            </div>
        )
        render(sourceSelect, document.querySelector('#sourceSelect'));

        this.setState({sourceSelect: {active: true}});
    }

    closeSourceSelect() {
        this.setState({sourceSelect: {active: false}})
    }

    openEpisode(ep) {
        console.log(ep);
        this.setState({episode: ep.data.attributes.number});
        let episode = (
            <Column>
                <Columns isCentered style={{margin: "0"}}>
                <Column  isSize={3}>
                    {ep.data.attributes.thumbnail != null && 
                        <img src={ep.data.attributes.thumbnail.original}/>
                    }
                    <Button onClick={() => this.openPlayer(ep)}>Open Player</Button>
                    <Subtitle>Choose Source: </Subtitle>
                    <Button href={`/animes/${this.props.match.params.id}/${this.props.match.params.keyword}/episodes/watch/9anime/${this.props.match.params.episodeNumber}`} isColor="dark" isSize="large">9anime</Button>
                </Column>
                <Column isSize='1/3'>
                    <Subtitle isSize={5} style={{marginBottom: "3px"}}><span style={{fontWeight: 800}}>Episode {ep.data.attributes.number}:</span> {ep.data.attributes.canonicalTitle}</Subtitle>
                    <Subtitle isSize={6} style={{marginBottom: "3px"}}>{ep.data.attributes.length} minutes</Subtitle>
                    <p>{ep.data.attributes.synopsis}</p>
                </Column>
                </Columns>
            </Column>
        )

        render(episode, document.querySelector('#episode'));
        this.props.history.push(`/animes/${this.props.match.params.id}/${this.props.match.params.keyword}/episodes/${ep.data.attributes.number}`)
    }

    setActiveTab(tab, noChangeRoute) {
        let current = this.state.selectedTabs;
        Object.keys(current).forEach((e) => {
            if(e == tab)
                current[e] = true;
            else 
                current[e] =false;
        });
        this.setState({selectedTabs: current});
        if(!noChangeRoute)
            this.props.history.push(`/animes/${this.props.match.params.id}/${this.props.match.params.keyword}/${tab}`)
    }

    async buildHero(meta) {
        let centerPanel = (
            <div>
                <img width="75%" src={meta.data.attributes.posterImage.large}></img>
                <Title isSize={3}>{meta.data.attributes.canonicalTitle}</Title>
            </div>);
        render(centerPanel, document.querySelector('#centerPanel'))
    }

    async buildSummary(meta) {
        let summary = (
            <Columns isCentered style={{padding: "10px"}}>
                <Column isSize='1/3'  hasTextAlign={"centered"}>
                    <Title isSize={4}>Summary: </Title>
                    <Subtitle isSize={5}>
                        {meta.data.attributes.synopsis}
                    </Subtitle>
                </Column>
                <Column isSize={3}>
                    <Tile isAncestor>
                        <Tile isVertical isParent>
                            <Tile isChild hasTextAlign={"centered"}>
                                <Box>
                                    <Button isFullWidth={true} href={`https://www.youtube.com/watch?v=${meta.data.attributes.youtubeVideoId}`} isColor="dark">Watch Trailer</Button>
                                </Box>
                            </Tile>
                            <Tile isChild>
                                <Box>
                                    <Title style={{margin: 5}} isSize={5}>Anime Details</Title>
                                    <Subtitle style={{margin: 5}} isSize={6}>English: {meta.data.attributes.titles["en"]}</Subtitle>
                                    <Subtitle  style={{margin: 5}} isSize={6}>Japanese: {meta.data.attributes.titles["ja_jp"]}</Subtitle>
                                    <Subtitle  style={{margin: 5}} isSize={6}>Type: {meta.data.attributes.showType}</Subtitle>
                                    <Subtitle  style={{margin: 5}} isSize={6}>Episodes: {meta.data.attributes.episodeCount}</Subtitle>
                                    <Subtitle  style={{margin: 5}} isSize={6}>Aired: {meta.data.attributes.startDate} to {meta.data.attributes.endDate} </Subtitle>
                                    <Subtitle  style={{margin: 5}} isSize={6}>Rating: {meta.data.attributes.ageRating}-{meta.data.attributes.ageRatingGuide}</Subtitle>
                                </Box>
                            </Tile>
                        </Tile>
                    </Tile>
                </Column>
            </Columns>
        )
        render(summary, document.querySelector('#summary'));
    }

    async buildEpisodes(meta) {
        let episodeLinks = await kitsu.getData(`${meta.data.relationships.episodes.links.self}`);
        episodeLinks.data = episodeLinks.data.sort((a, b) => {
            return a.id - b.id;
        })
        let promises = []
    
        episodeLinks.data.forEach((e, i) => {
            if(i < 100)
                promises.push(kitsu.getData(`https://kitsu.io/api/edge/episodes/${e.id}`));   
        });
        let episodes = await Promise.all(promises);
        //console.log(episodes);
        episodes = episodes.sort((a, b) => {
            return a.data.attributes.number - b.data.attributes.number;
        })
        let episodeList = [];
        for(let i = 0; i < episodes.length; i+=4) {
            let temp = [];
            episodeList.push((<Tile isParent style={{padding: 0}}>{temp}</Tile>));
            episodes.slice(i, i+4).forEach((e) => {
                temp.push(
                    <Tile isChild isSize={3} style={{padding: "10px"}} hasTextAlign="centered">
                        <Card style={{height: "100%"}}>
                            <CardImage>
                                {e.data.attributes.thumbnail != null && <Image src={e.data.attributes.thumbnail.original}/>}
                            </CardImage>
                            <CardContent>
                                <Subtitle isSize={5}><span style={{fontWeight: 800}}>Episode {e.data.attributes.number}:</span> {e.data.attributes.canonicalTitle}</Subtitle>
                                <Button onClick={() => this.openSourceSelect(e)} isColor="dark">Watch Now</Button>
                            </CardContent>
                        </Card>
                    </Tile>
                )
            });
        }

        render(episodeList, document.querySelector('#episodeList'));
    }

    async loadResults() {
        let meta = await kitsu.getAnime({id: this.props.match.params.id});
        this.buildHero(meta);
        this.buildSummary(meta);
        this.buildEpisodes(meta);
    }

    render() {
        return (
            <div>
            <Hero isColor='info' isSize='medium' style={{padding: "0"}}>
                <HeroBody style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <Columns isCentered>
                        <Column isSize='1/6' id="leftPanel"/>
                        <Column hasTextAlign={"centered"} isSize='1/3' id="centerPanel"/>
                        <Column isSize='1/6' id='rightPanel'/>
                    </Columns>
                </HeroBody>
                <HeroFooter>
                <Tabs isBoxed isFullWidth isSize="small">
                    <Container>
                            <TabList>
                                <Tab onClick={() => this.setActiveTab('summary')} isActive={this.state.selectedTabs.summary}>
                                    <TabLink>
                                        <span style={{paddingRight: "10px"}}><FontAwesomeIcon icon={faFile}/></span>Summary
                                    </TabLink>
                                </Tab>
                                <Tab onClick={() => {this.setActiveTab('episodes');this.setState({episode: 0})}} isActive={this.state.selectedTabs.episodes}>
                                    <TabLink>
                                    <span style={{paddingRight: "10px"}}><FontAwesomeIcon icon={faListUl}/></span>Episodes
                                    </TabLink>
                                </Tab>
                                <Tab onClick={() => this.setActiveTab('cast')} isActive={this.state.selectedTabs.cast}>
                                    <TabLink>
                                    <span style={{paddingRight: "10px"}}><FontAwesomeIcon icon={faUsers}/></span>Cast
                                    </TabLink>
                                </Tab>
                                <Tab onClick={() => this.setActiveTab('reactions')} isActive={this.state.selectedTabs.reactions}>
                                    <TabLink>
                                    <span style={{paddingRight: "10px"}}><FontAwesomeIcon icon={faComments}/></span>Reactions
                                    </TabLink>
                                </Tab>
                            </TabList>
                        </Container>
                    </Tabs>
                </HeroFooter>
            </Hero>
            <Container isFluid isHidden={!this.state.selectedTabs.summary} id="summary">
            <Title>Summary</Title>
            </Container>
            <Container isHidden={!this.state.selectedTabs.episodes} id="episodes">
                <Tile style={{padding: "20px"}} isAncestor isVertical id="episodeList" isHidden={!this.state.episode == 0}>
                </Tile>
                <Columns isCentered style={{padding: "20px"}} isHidden={this.state.episode == 0} id="episode">
                </Columns>
                <Modal style={{padding: "20px"}} isActive={this.state.sourceSelect.active} >
                    <ModalBackground />
                    <ModalCard id="sourceSelect" />
                    <ModalClose onClick={() => this.closeSourceSelect()} style={{marginTop: "75px"}} isSize="large"/>
                </Modal>
            </Container>
            <Container isFluid isHidden={!this.state.selectedTabs.cast} id="cast">
                <Title>Cast</Title>
            </Container>
            <Container isFluid isHidden={!this.state.selectedTabs.reactions} id="reactions">
                <Title>Reactions</Title>
            </Container>
            </div>
        );
    }
}

export default withRouter(Anime);