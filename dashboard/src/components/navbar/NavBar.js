import React from 'react';
import {
  NavLink
} from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="header">
      <li><NavLink to="/">Display</NavLink></li>
      <li><NavLink to="/add">Add</NavLink></li>
    </ul>
  );
};

export default NavBar;