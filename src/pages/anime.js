import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

import {Column, Columns, Subtitle, Hero, HeroBody, HeroFooter, Tabs, Container, TabList, Tab, TabLink, Image, Title} from 'bloomer';

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
                <Column isSize='1/2'  hasTextAlign={"centered"}>
                    <Title isSize={4}>{meta.data.attributes.titles["ja_jp"]}</Title>
                    <Subtitle isSize={5}>
                        {meta.data.attributes.synopsis}
                    </Subtitle>
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
                <HeroBody>
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