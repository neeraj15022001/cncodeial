import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { signup } from './';
import { connect } from 'react-redux';
import { clearAuthState } from '../actions/auth';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirm: '',
      username: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleConfirmPasswordChange = (e) => {
    this.setState({
      confirm: e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirm, username } = this.state;
    console.log(email, password, confirm);
    if (username && email && password && confirm === password)
      this.props.dispatch(signup(email, password, confirm, username));
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { email, password, confirm, username } = this.state;
    if (isLoggedIn) {
      return <Redirect to={'/'} />;
    }
    return (
      <Container
        className={'d-flex align-items-center justify-content-center vh-100'}
      >
        <Form
          className={'w-50 bg-light p-5 rounded-3 flex-shrink-0'}
          onSubmit={this.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={this.handleNameChange}
              value={username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordChange}
              value={password}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter Password"
              onChange={this.handleConfirmPasswordChange}
              value={confirm}
            />
            {error && <Form.Text className={'text-danger'}>{error}</Form.Text>}
          </Form.Group>
          <div className="d-grid gap-1">
            <Button variant="primary" type="submit" disabled={inProgress}>
              {inProgress ? 'Signing up...' : 'Submit'}
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Signup);
