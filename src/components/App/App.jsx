import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { PostsList, CustomNav, Login } from './';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
      <Router>
        <div className={'bg-dark vh-100 overflow-auto'}>
          <CustomNav />
          <Switch>
            <Route
              exact
              path={'/'}
              render={(props) => {
                return <PostsList {...props} data={this.props.posts} />;
              }}
            />
            <Route
              path={'/login'}
              render={(props) => {
                return <Login {...props} />;
              }}
            />
            <Route
              path={'/signup'}
              render={() => {
                return <h1 className={'text-white mt-5'}>signup</h1>;
              }}
            />
            <Route
              path={'/logout'}
              render={() => {
                return <h1 className={'text-white mt-5'}>logout</h1>;
              }}
            />
            <Route
              render={() => {
                return <h1 className={'text-white mt-5'}>404</h1>;
              }}
            />
          </Switch>
        </div>
      </Router>
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
