import React,{Component} from 'react';
import {Navbar, Form, FormGroup, Label, Input, Nav, NavbarToggler,Collapse,NavItem, NavbarBrand, Modal, ModalBody, ModalHeader, Button} from 'reactstrap';
import {Dropdown,DropdownItem,DropdownMenu,DropdownToggle} from 'reactstrap';
import { NavLink,Link } from 'react-router-dom';
import { Control, LocalForm, Errors  } from 'react-redux-form';


// should create a Header component as a class first then
// put render inside of the Header Class
// Yep, That worked :D

class Header extends Component{

    constructor(props){
        super(props);
        this.state={
         isNavOpen: false,
         isModalOpen: false,
         isRegisterOpen: false,
         dropdownOpen: false
        }

        this.toggle = this.toggle.bind(this);
        this.toggleNav = this.toggleNav.bind(this);

    
    }

    toggle(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    toggleNav(){
        if(window.innerWidth<1200){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    }


    // ReactStrap (Bootstrap) stuff
    render(){
        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="xl" fixed="top">
                    <div className="container">
                    <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
                    <NavbarBrand className="mr-auto text-primary" href="/home">
                    Central Library
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                        <NavItem className="ml-2" onClick={this.toggleNav}>
                            <NavLink className="nav-link text-primary" to="/home">
                            <span className="fa fa-home fa-lg"/> Home
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        )}}


export default Header;
