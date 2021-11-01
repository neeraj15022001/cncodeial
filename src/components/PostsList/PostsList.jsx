import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { CustomGrid, CustomPostCard } from './';
import PropTypes from 'prop-types';
class PostsList extends Component {
  addChildrenWithData = (data) => {
    const children = [];
    data &&
      // eslint-disable-next-line array-callback-return
      data.map((item, index) => {
        children.push(<CustomPostCard data={item} key={item._id} />);
      });
    console.log(children);
    return children;
  };
  render() {
    const { data } = this.props;
    const childrenArr = this.addChildrenWithData(data);
    console.log('children', data);
    return (
      <Container className={'pb-4'} fluid>
        <CustomGrid
          children={childrenArr}
          className={
            'row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 gy-4 pt-4 w-100 h-100'
          }
        />
      </Container>
    );
  }
}

PostsList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default PostsList;
