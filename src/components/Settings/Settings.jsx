import React, { Component } from 'react';
import { Button, Container, Form, Image, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { clearAuthState, editUser } from '../actions/auth';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      editProfile: false,
      password: '',
      confirm_password: '',
      name: '',
    };
  }
  componentDidMount() {
    this.setState((prevState) => {
      return {
        ...prevState,
        name: this.props.auth.user.name,
      };
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return { ...prevState, editProfile: false };
    });
    const { password, confirm_password, name } = this.state;
    const { user } = this.props.auth;
    if (confirm_password === password && name !== '') {
      this.props.dispatch(editUser(name, password, confirm_password, user._id));
    } else {
      alert('Passwords do not match');
    }
  };
  handleChange = ({ key, value }) => {
    if (key === 'editProfile') {
      this.props.dispatch(clearAuthState());
    }
    this.setState((prevState) => {
      return { ...prevState, [key]: value };
    });
  };
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render() {
    const { editProfile, password, confirm_password, name } = this.state;
    const { auth } = this.props;
    return (
      <Container
        className={'d-flex align-items-center justify-content-center h-100'}
        fluid
      >
        <Form
          className={'bg-light p-5 w-50 rounded-3 position-relative'}
          onSubmit={this.handleSubmit}
        >
          <Link to={'/'}>
            <Button
              variant={'outline-secondary '}
              className={'rounded-circle position-absolute top-0 start-0 m-4 '}
            >
              <CaretLeftFill />
            </Button>
          </Link>
          <Container
            className={
              'd-flex flex-column align-items-center justify-content-center'
            }
          >
            <Image
              src={'https://avatars.githubusercontent.com/u/55191873?v=4'}
              alt={'profile_picture'}
              className={'rounded-circle flex-grow-0 flex-shrink-0 mb-3'}
              style={{ height: '6rem', width: '6rem' }}
            />
            <Button
              variant={'link'}
              className={'text-decoration-none'}
              disabled={!editProfile}
            >
              Update Profile
            </Button>
          </Container>
          <Form.Group controlId={'usernameGroup'} className={'mb-2'}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type={'text'}
              placeholder={'Email'}
              value={auth.user.email}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId={'nameGroup'} className={'mb-2'}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type={'text'}
              placeholder={'Name'}
              value={name}
              onChange={(e) => {
                this.handleChange({ key: 'name', value: e.target.value });
              }}
              disabled={!editProfile}
            />
          </Form.Group>
          {editProfile && (
            <>
              <Form.Group controlId={'passwordGroup'} className={'mb-2'}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={'password'}
                  placeholder={'Password'}
                  value={password}
                  onChange={(e) => {
                    this.handleChange({
                      key: 'password',
                      value: e.target.value,
                    });
                  }}
                  disabled={!editProfile}
                />
              </Form.Group>
              <Form.Group controlId={'confirmPasswordGroup'} className={'mb-2'}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type={'password'}
                  placeholder={'Confirm Password'}
                  value={confirm_password}
                  onChange={(e) => {
                    this.handleChange({
                      key: 'confirm_password',
                      value: e.target.value,
                    });
                  }}
                  disabled={!editProfile}
                />
              </Form.Group>
            </>
          )}
          <Form.Group className={'mb-4'}>
            {auth.error && (
              <Form.Text className={'text-danger'}>
                {auth.error.message}
              </Form.Text>
            )}
            {auth.error === false && (
              <Form.Text className={'text-success'}>
                {'Sucessfully Updated'}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className={'row mx-1'}>
            <Button
              variant={'outline-secondary'}
              className={'me-3 col'}
              disabled={editProfile}
              onClick={() => {
                this.handleChange({ key: 'editProfile', value: true });
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant={'primary'}
              className={'col'}
              disabled={!editProfile}
              type={'submit'}
            >
              {auth.inProgress ? <Spinner animation={'border'} /> : 'Save'}
            </Button>
          </Form.Group>
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
export default connect(mapStateToProps)(Settings);
