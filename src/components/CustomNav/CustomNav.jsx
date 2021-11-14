import React, { Component } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PersonCircle } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { searchUsers } from '../actions/search';
import { debounce } from 'lodash';
class CustomNav extends Component {
  logout = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logout());
  };
  debouncedChangeHandler = debounce((e) => {
    this.props.dispatch(searchUsers(e.target.value));
  }, 500);

  render() {
    const { auth, results } = this.props;
    return (
      <Navbar bg="primary" expand="lg" sticky={'top'} variant={'dark'}>
        <Container fluid>
          <Navbar.Brand href="/">Codeial</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex align-items-center justify-content-center me-3 w-100 position-relative">
              <Container
                className={'w-50 my-0 ms-0 p-0 me-2 position-relative'}
                fluid
              >
                <FormControl
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.debouncedChangeHandler}
                />
                {/*Search Box*/}
                {results.length > 0 && (
                  <Container
                    className={'position-absolute start-0 end-0 m-0 p-0'}
                    style={{ top: '40px' }}
                  >
                    <ListGroup className={'p-2 bg-primary'}>
                      {results &&
                        results.map((user) => (
                          <ListGroupItem key={user._id}>
                            <Link to={`/user/${user._id}`}>
                              <PersonCircle className={'me-2 fs-4'} />
                            </Link>
                            {user.name}
                          </ListGroupItem>
                        ))}
                    </ListGroup>
                  </Container>
                )}
              </Container>
              <Button variant="outline-light">Search</Button>
            </Form>
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {auth.isLoggedIn && (
                <Container
                  className={
                    'text-white d-flex align-items-center justify-content-center my-2 my-sm-2 my-md-0 border-start'
                  }
                  fluid
                >
                  <Link to={'/settings'}>
                    <PersonCircle
                      color={'white'}
                      style={{ height: 30, width: 30 }}
                      className={'me-2'}
                    />
                  </Link>
                  <span>Neeraj</span>
                </Container>
              )}

              {!auth.isLoggedIn && (
                <Link
                  to={'/login'}
                  className={'text-decoration-none text-white'}
                >
                  <Button variant={'success'} className={'me-2'}>
                    Login
                  </Button>
                </Link>
              )}
              {auth.isLoggedIn && (
                <Button
                  variant={'danger'}
                  className={'me-2'}
                  onClick={this.logout}
                >
                  Logout
                </Button>
              )}
              {!auth.isLoggedIn && (
                <Link
                  to={'signup'}
                  className={'text-decoration-none text-black'}
                >
                  <Button variant={'light'}>Register</Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}
export default connect(mapStateToProps)(CustomNav);
