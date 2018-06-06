import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { elastic as Menu } from 'react-burger-menu';
import { faHome, faSearch, faUserCircle, faCalendarAlt, faSlidersH } from '@fortawesome/fontawesome-free-solid';

import styles from './topMenu.css';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.search();
    }

    search() {
        console.log("clicked")
        window.location = `/search/${document.querySelector('#searchQuery').value}`;
    }

    render = () => (
        <div className="base">
            <div className="center">
            <form autoComplete="off" onSubmit={this.onFormSubmit}>
                <label>
                    <FontAwesomeIcon icon={faSearch}/>
                </label>
                <input id="searchQuery" type="text" placeholder="What do you want to watch?"/>
                <button type="submit">
                    Search
                </button>
            </form>
            </div>
        </div>
    )
}