import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faUserCircle, faCalendarAlt, faSlidersH} from '@fortawesome/fontawesome-free-solid';

//style
import styles from './header.css';

export default class Header extends React.Component {
        constructor(props) {
            super(props);
        }
        search() {
            console.log("Searching...")
        }
        render = () => (
            <div className="navbar" role="navigation">
                <div className="navItem">
                    <a href="/">
                        <FontAwesomeIcon icon={faSlidersH}/>
                        Browse
                   </a>
                </div>
                <div className="navItem">
                    <a href="/">
                        <FontAwesomeIcon icon={faCalendarAlt}/>
                        Schedule
                    </a>
                </div>
                <div className="navItem logo">
                    <a href="/">
                        <img src="/assets/katsu-logo.svg" width="50" height="50"></img>
                    </a>
                </div>
                <div className="navItem">
                    <form>
                        <input placeholder="Search Anime"/>
                        <button type="button" onClick={this.search}>
                            <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </form>
                </div>
                <div className="navItem">
                    <a href="/">
                        <FontAwesomeIcon icon={faUserCircle}/>
                    </a>
                </div>

            </div>
        )
}
