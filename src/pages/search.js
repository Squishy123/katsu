import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js';
import {Container, Content, Title, Card, Tile, Box, Button, CardHeader, Subtitle, CardHeaderTitle, CardImage, Image, CardContent, Media, MediaLeft} from 'bloomer';


export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.loadSearch();
    }   

    async loadSearch() {
        let items = await kitsu.getSearch({query: this.props.match.params.keyword});
        let mediaList = [];
        
        for(let i = 0; i < items.data.length; i+=4) {
            let temp = [];
            mediaList.push((<Tile isParent style={{padding: 0}}>{temp}</Tile>));
                items.data.slice(i, i+4).forEach((e) => {
                    temp.push(
                    <Tile isChild isSize={3} style={{padding: "10px"}} hasTextAlign={"centered"}>
                        <Card style={{height: "100%"}} style={{padding: "10px"}}>
                            <CardHeader style={{height: "50px"}}>
                                <CardHeaderTitle>
                                 <Title isSize={5}>{e.attributes.canonicalTitle}</Title>
                                </CardHeaderTitle>
                            </CardHeader>
                            <CardImage>
                                <Image src={e.attributes.posterImage.large}/>
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
       render(mediaList, document.querySelector('#searchResults'));
    }

    render()  {
        return (
        <Container style={{padding: "20px"}}>
            <Tile isAncestor id="searchResults" isVertical>
            </Tile>
        </Container>)
    }
}