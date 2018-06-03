import React from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class Header extends React.Component {
        constructor(props) {
            super(props);
            
            //manage toggle
            this.toggle = this.toggle.bind(this);
            this.state = {
                isOpen:  false
            }
        }

        toggle() {
            this.setState({
                isOpen: !this.state.isOpen
            })
        }

        render = () => (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Amine
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/page1">Page 1</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/page1">Page 2</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
}