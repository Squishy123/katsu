import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { elastic as Menu } from 'react-burger-menu';
import { faHome, faSearch, faUserCircle, faCalendarAlt, faSlidersH } from '@fortawesome/fontawesome-free-solid';

import styles from './topMenu.css';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    _handleKeyPress = (e) => {
        if(e.key === 'Enter')
            this.search();
    }

    search() {
        console.log("clicked")
        window.location = `/search/${document.querySelector('#searchQuery').value}`;
    }

    render = () => (
        <div className="base">
            <div className="center">
            <form>
                <label>
                    <FontAwesomeIcon icon={faSearch}/>
                </label>
                <input id="searchQuery" type="text" placeholder="What do you want to watch?" onKeyPress={this._handleKeyPress}/>
                <button type="button" onClick={this.search}>
                    Search
                </button>
            </form>
            </div>
        </div>
    )
}