import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Chat, CustomGrid, CustomPostCard, FriendsList } from './';
import PropTypes from 'prop-types';
import { getAuthFromLocalStorage } from '../helpers/utils';
import { Redirect } from 'react-router-dom';
class PostsList extends Component {
  addChildrenWithData = (data) => {
    const children = [];
    data &&
      // eslint-disable-next-line array-callback-return
      data.map((item, index) => {
        children.push(<CustomPostCard data={item} key={item._id} />);
      });
    // console.log(children);
    return children;
  };
  render() {
    const token = getAuthFromLocalStorage();
    if (!token) {
      return <Redirect to={'/login'} />;
    }
    const { data } = this.props;
    const childrenArr = this.addChildrenWithData(data);
    // console.log('children', data);
    return (
      <Row>
        <Container className={'pb-4 col-12 col-sm-12 col-md-9'} fluid>
          <CustomGrid
            children={childrenArr}
            className={
              'row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 gy-4 pt-4 w-100 h-100'
            }
          />
        </Container>
        <Container className={'col-0 col-sm-0 col-md-3 bg-light'}>
          <FriendsList />
        </Container>
        {/*<Chat />*/}
      </Row>
    );
  }
}

PostsList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PostsList;
