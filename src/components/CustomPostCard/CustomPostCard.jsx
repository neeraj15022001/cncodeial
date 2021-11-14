import React, { Component } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  FormControl,
  Accordion,
} from 'react-bootstrap';
import { Chat, HeartFill, PersonCircle } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, addLikeToStore } from '../actions/posts';

class CustomPostCard extends Component {
  constructor() {
    super();
    this.state = {
      commentContent: '',
    };
  }
  handleComment = (e) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        commentContent: e.target.value,
      };
    });
  };
  handleKeyPress = (e) => {
    const { commentContent } = this.state;
    const { data } = this.props;
    if (e.key === 'Enter') {
      this.props.dispatch(addComment(commentContent, data._id));
      this.setState({ commentContent: '' });
    }
  };
  handleClick = () => {
    const { data, user } = this.props;
    console.log(data, user);
    this.props.dispatch(addLikeToStore(data._id, 'Post', user._id));
  };
  render() {
    const { data, user } = this.props;
    const isPostLikedByUser = data.likes.includes(user._id);
    return (
      <Card bg={'light'} className={'h-100'}>
        <Card.Header>
          <Row>
            <Col
              sm={2}
              className={'d-flex align-items-center justify-content-center'}
            >
              <Link to={`/user/${data.user._id}`}>
                <PersonCircle
                  className={'flex-shrink-0'}
                  style={{ height: 50, width: 50 }}
                />
              </Link>
            </Col>
            <Col
              sm={9}
              className={'d-flex align-items-center justify-content-start'}
            >
              <Container className={'m-0 p-0'} fluid>
                <p className={'m-0 p-0 fs-5'}>{data.user.name}</p>
                <p className={'m-0 p-0 fs-6'}>a minute ago</p>
              </Container>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>{data.content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Container className={'p-0 mb-3'} fluid>
            <Row>
              <Col>
                <div className="d-grid h-100">
                  <Button variant={'primary'} onClick={this.handleClick}>
                    {isPostLikedByUser ? (
                      <HeartFill color={'#B33F40'} className={'me-2'} />
                    ) : (
                      <HeartFill color={'white'} className={'me-2'} />
                    )}
                    <span>{data.likes.length}</span>
                  </Button>
                </div>
              </Col>
              <Col>
                <div className="d-grid h-100">
                  <Button variant={'dark'}>
                    <Chat className={'me-2'} />
                    <span>Comment</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <Container className={'p-0'} fluid>
            <FormControl
              value={this.state.commentContent}
              placeholder={'Comment...'}
              onChange={this.handleComment}
              onKeyPress={this.handleKeyPress}
            />
            {data.comments.length !== 0 && <h4 className={'py-3'}>Comments</h4>}
            {data.comments.length !== 0 && (
              <Accordion className={'pb-3'}>
                <Accordion.Item eventKey={0}>
                  <Accordion.Header>Comments</Accordion.Header>
                  <Accordion.Body>
                    {data.comments.map((comment) => (
                      <Card
                        bg={'light'}
                        className={'text-dark mb-2'}
                        key={comment._id}
                      >
                        <Card.Header>
                          <Row>
                            <Col
                              sm={1}
                              className={
                                'd-flex align-items-center justify-content-center'
                              }
                            >
                              <PersonCircle
                                className={'flex-shrink-0 ms-2'}
                                style={{ height: 30, width: 30 }}
                              />
                            </Col>
                            <Col
                              sm={11}
                              className={
                                'd-flex align-items-center justify-content-start'
                              }
                            >
                              <Container className={'m-0 p-0'} fluid>
                                <p className={'m-0 p-0'}>{comment.user.name}</p>
                                <p className={'m-0 p-0 small'}>a minute ago</p>
                              </Container>
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>{comment.content}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Container>
        </Card.Footer>
      </Card>
    );
  }
}

CustomPostCard.propTypes = {
  data: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}
export default connect(mapStateToProps)(CustomPostCard);
