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
            mediaList.push((<Tile isParent style={{padding: 0}}>{temp}</Tile>));
                items.data.slice(i, i+4).forEach((e) => {
                    temp.push(
                    <Tile isChild isSize={3} style={{padding: "10px"}} hasTextAlign={"centered"}>
                        <Card style={{height: "100%"}}>
                            <CardHeader style={{height: "50px"}}>
                                <CardHeaderTitle>
                                 <Subtitle isSize={5}>{e.attributes.canonicalTitle}</Subtitle>
                                </CardHeaderTitle>
                            </CardHeader>
                            <CardImage>
                                <Image src={e.attributes.posterImage.large}/>
                            </CardImage>
                            <CardContent>
                                <Button href={`/animes/${e.id}/${e.attributes.canonicalTitle}`} isColor='dark' style={{borderRadius: 0}}>
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                   </Tile>)
                });    
        }

       // this.state.trendingAnime.push(<div className="mediaList">{mediaList}</div>)
        render(mediaList, document.querySelector('#trendingList'))
    }

    render() {
        this.loadTrending();
        return (
            <Container style={{padding: "20px"}}>
                <Tile isAncestor id="trendingList" isVertical>
                </Tile>
            </Container>)
    }

}
    

export default Home;