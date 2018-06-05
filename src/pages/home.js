import React from 'react';
import { render } from 'react-dom';
//import styles from './home.css';
import * as kitsu from '../scripts/kitsu-api.js';
import {Container, Content, Title, Card, Tile, Box, Button, CardHeader, Subtitle, CardHeaderTitle, CardImage, Image, CardContent, Media, MediaLeft} from 'bloomer';

//import MediaCard from '../components/mediaCard.js';

class Home extends React.Component {

    constructor(props) {
        super(props);
        /*this.state = {
            trendingAnime: [<h1 className="display">Trending Anime</h1>]
        }*/
    } 

    async loadTrending() {
        let items = await kitsu.getTrending();
        let mediaList = [];
        
        for(let i = 0; i < items.data.length; i+=4) {
            let temp = [];
            mediaList.push((<Tile isParent>{temp}</Tile>));
                items.data.slice(i, i+4).forEach((e) => {
                    temp.push(
                    <Tile isChild isSize={3} style={{padding: "10px"}}>
                        <Card style={{height: "100%"}}>
                            <CardHeader>
                                <CardHeaderTitle>
                                 <Subtitle isSize={5}>{e.attributes.canonicalTitle}</Subtitle>
                                </CardHeaderTitle>
                            </CardHeader>
                            <CardImage>
                                <Image src={e.attributes.posterImage.medium}/>
                            </CardImage>
                            <CardContent>
                                <Button href={`/animes/${e.id}/${e.attributes.canonicalTitle}`} isColor='dark'>
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                   </Tile>)
                });    
        }
        console.log(mediaList);

       // this.state.trendingAnime.push(<div className="mediaList">{mediaList}</div>)
        render(mediaList, document.querySelector('#trendingList'))
    }

    render() {
        this.loadTrending();
        return (
            <Container style={{padding: "0 10px 0 10px"}}>
                <Tile isAncestor id="trendingList" isVertical>
                </Tile>
            </Container>)
    }

}
    

export default Home;