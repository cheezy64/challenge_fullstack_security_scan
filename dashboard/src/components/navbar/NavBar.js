import React from 'react';
import {
  NavLink
} from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="header">
      <li><NavLink exact to="/" activeClassName="active">Display</NavLink></li>
      <li><NavLink to="/add" activeClassName="active">Add</NavLink></li>
    </ul>
  );
};

export default NavBar;