import React from 'react';

export default class MediaCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <img src={this.props.meta.attributes.posterImage.medium}></img>
            <h5>{this.props.meta.attributes.canonicalTitle}</h5>
        </div>
        )
    }
}