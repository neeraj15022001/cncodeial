import React, { Component } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { createPost } from '../actions/posts';
import { connect } from 'react-redux';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }
  handleChange = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        content: e.target.value,
      };
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    this.props.dispatch(createPost(this.state.content));
  };
  render() {
    return (
      <Container className={'w-100 p-4 bg-light'} fluid>
        <Form onSubmit={this.handleSubmit}>
          <Form.Control
            as={'textarea'}
            onChange={this.handleChange}
            placeholder={'Enter Post Content'}
            className={'mb-2'}
          />
          <div className="d-flex align-items-center justify-content-end">
            <Button variant={'primary'} type={'submit'}>
              Create Post
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

export default connect()(CreatePost);
