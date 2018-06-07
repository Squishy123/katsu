import React from 'react';
import {render} from 'react-dom';
import * as kitsu from '../scripts/kitsu-api.js'

export default class Watch extends React.Component {
    constructor(props) {
        super(props);
    }

    openSource(source) {
        this.setState({player: {
            source: source
        }});

        if(source == "9anime") {
            
        }
    }
}