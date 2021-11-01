import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

class CustomNav extends Component {
  render() {
    return (
      <Navbar bg="primary" expand="lg" sticky={'top'} variant={'dark'}>
        <Container fluid>
          <Navbar.Brand href="#">Codeial</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex justify-content-center me-3 w-100">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 w-50"
                aria-label="Search"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Container
                className={
                  'text-white d-flex align-items-center justify-content-end border-start'
                }
                fluid
              >
                <PersonCircle
                  color={'white'}
                  style={{ height: 30, width: 30 }}
                  className={'me-2'}
                />
                <span>Neeraj</span>
              </Container>
              <Button variant={'success'} className={'me-2'}>
                Login
              </Button>
              <Button variant={'danger'} className={'me-2'}>
                Logout
              </Button>
              <Button variant={'light'}>Register</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default CustomNav;
