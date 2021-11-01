import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { CustomGrid, CustomPostCard } from './';
class PostsList extends Component {
  addChildrenWithData = (data) => {
    const children = [];
    data &&
      data.map((item, index) => {
        children.push(<CustomPostCard data={item} key={item._id} />);
      });
    console.log(children);
    return children;
  };
  render() {
    const { data } = this.props;
    const childrenArr = this.addChildrenWithData(data);
    console.log('children', childrenArr);
    return (
      <Container fluid>
        <CustomGrid
          numberOfColumns={3}
          gapBetweenColumns={0}
          gutter={2}
          children={childrenArr}
        />
      </Container>
    );
  }
}

export default PostsList;
