import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { PostsList, CustomNav } from './';
import PropTypes from 'prop-types';

class App extends Component {
  componentDidMount() {
    console.log(
      '%c dispatching and getting new posts',
      'background:red; color:white'
    );
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('%c App rendered', 'background:red; color:white');
    console.log(`%cProps`, 'background:red; color:white', this.props);
    return (
      <div className={'bg-dark vh-100 overflow-auto'}>
        <CustomNav />
        <PostsList data={this.props.posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
