import React from 'react';
import styles from './mediaCard.css';

export default class MediaCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="container">
            <div className="card">
                <img className="poster" src={this.props.meta.attributes.posterImage.medium}></img>
                <h2 className="display">{this.props.meta.attributes.canonicalTitle}</h2>
                <a href={`/animes/${this.props.meta.id}/${this.props.meta.attributes.canonicalTitle}`}>Watch Now</a>
            </div>
        </div>
        )
    }
}