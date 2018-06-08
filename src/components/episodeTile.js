import React from 'react';
import {render} from 'react-dom';

import {Tile, Card, CardImage, Image, CardContent, Subtitle, Button} from 'bloomer';
/**
 * EpisodeTile class 
 * Takes in a kitsu episode metadata object
 */
export default class EpisodeTile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tile isChild isSize={3} style={{padding: "10px"}} hasTextAlign="centered">
            <Card style={{height: "100%"}}>
                <CardImage>
                    {this.props.meta.data.attributes.thumbnail != null && <Image src={this.props.meta.data.attributes.thumbnail.original}/>}
                </CardImage>
                <CardContent>
                    <Subtitle isSize={5}><span style={{fontWeight: 800}}>Episode {this.props.meta.data.attributes.number}:</span> {this.props.meta.data.attributes.canonicalTitle}</Subtitle>
                    <Button isColor="dark">Watch Now</Button>
                </CardContent>
            </Card>
        </Tile>
        )
    }
}