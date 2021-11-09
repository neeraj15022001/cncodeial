import React, { Component } from 'react';
import { Button, Container, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';

class User extends Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
    }
  }

  render() {
    console.log(this.props.match.params.id);
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
          </Container>
          <Form.Group controlId={'usernameGroup'} className={'mb-2'}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type={'text'}
              placeholder={'Email'}
              value={'gneeraj32595'}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId={'nameGroup'} className={'mb-4'}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type={'text'}
              placeholder={'Name'}
              value={'NEeraj'}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className={'d-grid'}>
            <Button variant={'primary'}>Add Friend</Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default User;
