import React, { Component } from 'react';
import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CaretLeftFill } from 'react-bootstrap-icons';
import { fetchUserProfile } from '../actions/profile';
import { connect } from 'react-redux';
import { APIUrls } from '../actions';
import { getAuthFromLocalStorage } from '../helpers/utils';
import { addFriend, removeFriend } from '../actions/friends';

class User extends Component {
  constructor() {
    super();
    this.state = {
      success: null,
      error: null,
      success_message: '',
      inProgress: false,
    };
  }
  componentDidMount() {
    console.log(this.props);
    const { match } = this.props;
    if (match.params.id) {
      this.props.dispatch(fetchUserProfile(match.params.id));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: prevMatch } = this.props;
    const { match: currentMatch } = this.props;
    if (prevMatch.params.id !== currentMatch.params.id) {
      this.props.dispatch(fetchUserProfile(currentMatch.params.id));
    }
  }

  checkIfUserIsFriend = () => {
    const { friends, match } = this.props;
    const isFriend =
      friends.friends &&
      friends.friends
        .map((friend) => friend.to_user._id)
        .indexOf(match.params.id);
    console.log('isFriend', isFriend);
    return isFriend !== -1;
  };
  addFriend = async () => {
    console.log('calling add Friend function');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    };
    const url = APIUrls.addFriend(this.props.match.params.id);
    this.setState({ inProgress: true });
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('data after fetching ', data);
    if (data.success) {
      console.log(data);
      this.setState({
        success: true,
        success_message: 'Added Friend Successfully',
      });
      this.props.dispatch(addFriend(data.data.friendship));
    }
    this.setState({ inProgress: false });
  };
  removeFriend = async () => {
    console.log('calling remove Friend function');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthFromLocalStorage()}`,
      },
    };
    const url = APIUrls.removeFriend(this.props.match.params.id);
    this.setState({ inProgress: true });
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('data after removing friend ', data);
    if (data.success) {
      console.log(data);
      this.setState({
        success: true,
        success_message: 'Removed Friend Successfully',
      });
      this.props.dispatch(removeFriend(this.props.match.params.id));
    }
    this.setState({ inProgress: false });
  };
  render() {
    console.log(this.props);
    const isUserFriend = this.checkIfUserIsFriend();
    const { user, inProgress } = this.props.profile;
    if (inProgress) {
      return (
        <Container
          className={'d-flex align-items-center justify-content-center vh-100'}
        >
          <Spinner animation={'grow'} variant={'light'} />
        </Container>
      );
    }
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
              value={user.email}
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId={'nameGroup'} className={'mb-4'}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type={'text'}
              placeholder={'Name'}
              value={user.name}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className={'d-grid'}>
            <Button
              variant={isUserFriend ? 'danger' : 'primary'}
              onClick={isUserFriend ? this.removeFriend : this.addFriend}
              disabled={this.state.inProgress}
            >
              {isUserFriend ? 'Remove Friend' : 'Add Friend'}
            </Button>
          </Form.Group>
          {this.state.success && (
            <Alert
              className={
                'mt-2 d-flex align-items-center justify-content-center'
              }
              variant={'success'}
            >
              {this.state.success_message}
            </Alert>
          )}
          {this.state.error && (
            <Alert
              className={
                'mt-2 d-flex align-items-center justify-content-center'
              }
              variant={'success'}
            >
              {this.state.error}
            </Alert>
          )}
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(User);
