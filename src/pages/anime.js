import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

import { Tile, Button, Box, Column, Columns, Subtitle, Hero, HeroBody, HeroFooter, Tabs, Container, TabList, Tab, TabLink, Image, Title} from 'bloomer';

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
            }
        }
        this.setActiveTab = this.setActiveTab.bind(this);

        this.loadResults();
    }

    setActiveTab(tab) {
        let current = this.state.selectedTabs;
        Object.keys(current).forEach((e) => {
            if(e == tab)
                current[e] = true;
            else 
                current[e] =false;
        });
        this.setState({selectedTabs: current});
    }

    async buildHero(meta) {
        let centerPanel = (
            <div>
                <Image src={meta.data.attributes.posterImage.large}></Image>
                <Title isSize={3}>{meta.data.attributes.canonicalTitle}</Title>
            </div>);
        render(centerPanel, document.querySelector('#centerPanel'))
    }

    async buildSummary(meta) {
        let summary = (
            <Columns isCentered style={{paddingTop: "10px"}}>
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
        let episodes = await kitsu.getData(meta.data.relationships.episodes.links.self);

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
                    <Tabs isBoxed isFullWidth>
                        <Container>
                                <TabList>
                                    <Tab onClick={() => this.setActiveTab('summary')} isActive={this.state.selectedTabs.summary}>
                                        <TabLink>
                                            Summary
                                        </TabLink>
                                    </Tab>
                                    <Tab onClick={() => this.setActiveTab('episodes')} isActive={this.state.selectedTabs.episodes}>
                                        <TabLink>
                                            Episodes
                                        </TabLink>
                                    </Tab>
                                    <Tab onClick={() => this.setActiveTab('cast')} isActive={this.state.selectedTabs.cast}>
                                        <TabLink>
                                            Cast
                                        </TabLink>
                                    </Tab>
                                    <Tab onClick={() => this.setActiveTab('reactions')} isActive={this.state.selectedTabs.reactions}>
                                        <TabLink>
                                            Reactions
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
            <Container isFluid isHidden={!this.state.selectedTabs.episodes} id="episodes">
                <Title>Episodes</Title>
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

export default Anime;