import React, { Component } from 'react';
import { deleteAllItems, deleteItem, getItem, getItems, addItem, updateItem} from "../api/apiFunctions"
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem, NavbarBrand } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";
import EditData from "./EditData"
import ViewData from "./ViewData"
function TopNavBar(props)
{

  
  return(
      <div id="nav-bar">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/" >Shopping List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                View
              </Nav.Link>
                
              <Nav.Link href="/edit">
                Edit
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>






        <Switch>
          <Route exact path={"/"}>
            <ViewData />
          </Route>
          <Route path={"/edit"}>
            <EditData />
          </Route>

 
        </Switch>
      </div>
  )
}

export {TopNavBar}