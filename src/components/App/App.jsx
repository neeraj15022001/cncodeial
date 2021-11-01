import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { PostsList } from './';

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
      <div className={'bg-light vh-100 overflow-hidden'}>
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

export default connect(mapStateToProps)(App);
