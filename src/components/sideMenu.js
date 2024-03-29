import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {elastic as Menu} from 'react-burger-menu';
import { faHome, faSearch, faUserCircle, faCalendarAlt, faSlidersH} from '@fortawesome/fontawesome-free-solid';

//style
//import styles from './header.css';
import styles from './sideMenu.css';
export default class SideMenu extends React.Component {
        constructor(props) {
            super(props);
        }
        showSettings(event) {
            event.preventDefault();
        }

        search() {
            console.log("Searching...")
        }
        render = () => (
            <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} style={{zIndex: 200}}>
                <a className="menu-item logo" href="/">
                    <span style={{fontSize: "30px"}}><span style={{fontWeight: "bold"}}>A</span>mine</span>
                </a>
                <a className="menu-item" href="/">
                    <FontAwesomeIcon icon={faSlidersH}/> Browse
                </a>
                <a className="menu-item" href="/">
                    <FontAwesomeIcon icon={faCalendarAlt}/> Schedule
                </a>
                <a className="menu-item" href="/">
                        <FontAwesomeIcon icon={faUserCircle}/> Account
                </a>
                <div className="menu-item" id="bot">
                    <h3>
                        Version: Katsu
                    </h3>
                </div>
            </Menu>
        )
}
