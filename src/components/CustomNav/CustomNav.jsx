import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';

class CustomNav extends Component {
  render() {
    return (
      <Navbar bg="primary" expand="lg" sticky={'top'} variant={'dark'}>
        <Container fluid>
          <Navbar.Brand href="#">
            <Link to={'/'} className={'text-decoration-none text-white'}>
              Codeial
            </Link>
          </Navbar.Brand>
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

              <Link to={'/login'} className={'text-decoration-none text-white'}>
                <Button variant={'success'} className={'me-2'}>
                  Login
                </Button>
              </Link>
              <Link
                to={'/logout'}
                className={'text-decoration-none text-white'}
              >
                <Button variant={'danger'} className={'me-2'}>
                  Logout
                </Button>
              </Link>
              <Link to={'signup'} className={'text-decoration-none text-black'}>
                <Button variant={'light'}>Register</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default CustomNav;
