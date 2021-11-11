import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import { connect } from 'react-redux';

class FriendsList extends Component {
  render() {
    const { friends } = this.props;
    console.log(friends);
    return (
      <Container className={'p-4'}>
        <h4 className={'fw-bold mb-4'}>Friends</h4>
        <ListGroup>
          {friends.friends && !friends.inProgress ? (
            friends.friends.map((friend) => (
              <ListGroupItem
                className={'d-flex align-items-center '}
                key={friend.to_user._id}
              >
                <PersonCircle className={'me-2 text-primary fs-3'} />
                <span>{friend.to_user.name}</span>
              </ListGroupItem>
            ))
          ) : (
            <Spinner animation={'border'} />
          )}
        </ListGroup>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(FriendsList);
