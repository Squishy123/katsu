import React from 'react';
import {render} from 'react-dom';

import {Columns, Column, Title, Subtitle, Tile, Box, Button} from 'bloomer';
/**
 * Summary class 
 * Takes in a kitsu episode metadata object
 */
export default class EpisodeSummary extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Columns isCentered style={{padding: "10px"}}>
            <Column isSize='1/3'  hasTextAlign={"centered"}>
                <Title isSize={4}>Summary: </Title>
                <Subtitle isSize={5}>
                    {this.props.meta.data.attributes.synopsis}
                </Subtitle>
            </Column>
            <Column isSize={3}>
                <Tile isAncestor>
                    <Tile isVertical isParent>
                        <Tile isChild hasTextAlign={"centered"}>
                            <Box>
                                <Button isFullWidth={true} href={`https://www.youtube.com/watch?v=${this.props.meta.data.attributes.youtubeVideoId}`} isColor="dark">Watch Trailer</Button>
                            </Box>
                        </Tile>
                        <Tile isChild>
                            <Box>
                                <Title style={{margin: 5}} isSize={5}>Anime Details</Title>
                                <Subtitle style={{margin: 5}} isSize={6}>English: {this.props.meta.data.attributes.titles["en"]}</Subtitle>
                                <Subtitle  style={{margin: 5}} isSize={6}>Japanese: {this.props.meta.data.attributes.titles["ja_jp"]}</Subtitle>
                                <Subtitle  style={{margin: 5}} isSize={6}>Type: {this.props.meta.data.attributes.showType}</Subtitle>
                                <Subtitle  style={{margin: 5}} isSize={6}>Episodes: {this.props.meta.data.attributes.episodeCount}</Subtitle>
                                <Subtitle  style={{margin: 5}} isSize={6}>Aired: {this.props.meta.data.attributes.startDate} to {this.props.meta.data.attributes.endDate} </Subtitle>
                                <Subtitle  style={{margin: 5}} isSize={6}>Rating: {this.props.meta.data.attributes.ageRating}-{this.props.meta.data.attributes.ageRatingGuide}</Subtitle>
                            </Box>
                        </Tile>
                    </Tile>
                </Tile>
            </Column>
        </Columns>
        )
    }
}