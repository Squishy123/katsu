import React from 'react';
import {render} from 'react-dom';

import {Column, Columns, Button, Subtitle} from 'bloomer'

export default class EpisodeSummary extends React.Component {
  constructor(props) {
      super(props);
  }

 render() {
    return (
        <Column>
            <Columns isCentered style={{margin: "0"}}>
            <Column  isSize={3}>
                {this.props.meta.data.attributes.thumbnail != null && 
                    <img src={this.props.meta.data.attributes.thumbnail.original}/>
                }
            </Column>
            <Column isSize='1/3'>
                <Subtitle isSize={5} style={{marginBottom: "3px"}}><span style={{fontWeight: 800}}>Episode {this.props.meta.data.attributes.number}:</span> {this.props.meta.data.attributes.canonicalTitle}</Subtitle>
                <Subtitle isSize={6} style={{marginBottom: "3px"}}>{this.props.meta.data.attributes.length} minutes</Subtitle>
                <p>{this.props.meta.data.attributes.synopsis}</p>
            </Column>
            </Columns>
        </Column>
    )
    }
}