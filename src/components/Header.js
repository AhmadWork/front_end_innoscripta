import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import * as actions from '../store/actions';
import Checkout from './Checkout'
function Header (props) {
  const [isNavOpen,setIsNavOpen] = useState(false)

  const handleLogout = (e) => {
    e.preventDefault();
    props.dispatch(actions.authLogout());
  }


    return (
      <header className="d-flex align-items-center justify-content-between">

        <h1 className="logo my-0 font-weight-normal h4">
          <Link to="/">InnoScripta Pizzarea</Link>
        </h1>
        <div className="navigation d-flex justify-content-end">

        {props.isAuthenticated?(

     
          <Nav>
            <NavItem>
              <NavLink tag={Link} to="/archive">Archive</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          )
          :
          (<>
      <NavLink tag={Link} to="/login">Login</NavLink>
            
            <NavLink tag={Link} to="/register">Register</NavLink>
            </>
          )
       
        }
        <NavLink className='menu-button' tag={Link} onClick={()=> setIsNavOpen(!isNavOpen)} >Cart</NavLink>
 </div>
 <Checkout isOpen ={isNavOpen} />
 </header>
    );
  }


const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);
