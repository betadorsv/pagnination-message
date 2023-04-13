import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/common/logo.png";
import "./header.scss";

export default function Header() {
  return (
    <Navbar className="header">
      <Navbar.Brand href="#home">
        <img src={Logo} height="40" className="d-inline-block align-top" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {/* <Nav.Link className='header-link' href="#Resigter">Resigter</Nav.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
}
