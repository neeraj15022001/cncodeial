import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { login } from './';
import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
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
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    if (email && password) this.props.dispatch(login({ email, password }));
  };
  render() {
    const { error, inProgress } = this.props.auth;
    const { email, password } = this.state;
    return (
      <Container
        className={'d-flex align-items-center justify-content-center vh-100'}
      >
        <Form
          className={'w-50 bg-light p-5 rounded-3 flex-shrink-0'}
          onSubmit={this.handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={this.handleEmailChange}
              value={email}
            />
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
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
          <div className="d-grid gap-1">
            <Button variant="primary" type="submit" disabled={inProgress}>
              {inProgress ? 'Logging in...' : 'Submit'}
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
export default connect(mapStateToProps)(Login);
