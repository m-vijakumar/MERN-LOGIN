import React from 'react';
import {Navbar , Nav } from 'react-bootstrap'


function Header(props){

 const  logger =()=>{

      props.logger();
  }
    return(

        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link    href="/login" >Login</Nav.Link>
           
          </Nav>
         
        </Navbar.Collapse>
      </Navbar>

   
    )
}

export default Header ;