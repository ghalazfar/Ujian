import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onLogout, keepLogin, cookiesChecked } from '../actions';

const cookies = new Cookies()

class Header extends Component {

    componentWillMount() {
        const cookieNya = cookies.get('myCat');
        if(cookieNya !== undefined) {
            this.props.keepLogin(cookieNya);
        }
        else {
            this.props.cookiesChecked();
        }
    }

    componentWillReceiveProps(newProps) { 
        if(newProps.authGlobal.username === ""){
            cookies.remove('myCat')
        }
    }

    onLogOutClick = () => {
        this.props.onLogout();
    }
    renderNavbar() {
        if(this.props.authGlobal.email != "") {
            return(
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <Link to="/">TWENTIWAN</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavDropdown eventKey={4} title={"Hello, " + this.props.authGlobal.username} id="basic-nav-dropdown">
                            <MenuItem eventKey={4.1}><Link to="/history">Transaction History</Link></MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={4.2} onSelect={this.onLogOutClick}>Log Out</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Homepage</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                        <Link to="/register">Register</Link>
                        </NavItem>
                        <NavItem eventKey={2}>
                        <Link to="/login">Login</Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )    
    }
    render() {
        return(
            this.renderNavbar()
        )
    }    
}

const mapStateToProps = (state) => {
  const auth = state.auth;
  return { authGlobal: auth };
}
export default connect(mapStateToProps, { onLogout, keepLogin, cookiesChecked })(Header);
