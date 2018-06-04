import React from 'react';
import styles from './mediaCard.css';

export default class MediaCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="container">
            <img className="poster" src={this.props.meta.attributes.posterImage.medium}></img>
            <h5>{this.props.meta.attributes.canonicalTitle}</h5>
        </div>
        )
    }
}