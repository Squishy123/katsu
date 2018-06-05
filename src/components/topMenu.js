import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { elastic as Menu } from 'react-burger-menu';
import { faHome, faSearch, faUserCircle, faCalendarAlt, faSlidersH } from '@fortawesome/fontawesome-free-solid';

import styles from './topMenu.css';

export default class TopMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => (
        <div className="base">
            <div className="center">
            <form>
                <label>
                    <FontAwesomeIcon icon={faSearch}/>
                </label>
                <input placeholder="What do you want to watch?"/>
                <button type="button" onClick={this.search}>
                    Search
                </button>
            </form>
            </div>
        </div>
    )
}