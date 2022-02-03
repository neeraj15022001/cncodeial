import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { PostsList, CustomNav, Login, Signup, Settings, User } from './';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { Container, Spinner } from 'react-bootstrap';
import { fetchFriends } from '../actions/friends';

const PrivateRoute = (props) => {
  const { component: Component, isLoggedIn, path } = props;
  return (
    <Route
      path={path}
      render={(props) => {
        console.log(props);
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};

class App extends Component {
  componentDidMount() {
    // console.log(
    //   '%c dispatching and getting new posts',
    //   'background:red; color:white'
    // );
    this.props.dispatch(fetchPosts());
    this.props.dispatch(fetchFriends());
    // this.props.dispatch(fetchFriends(userId));

    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      // console.log(user);
      this.props.dispatch(
        authenticateUser({ email: user.email, _id: user._id, name: user.name })
      );
    }
  }

  render() {
    const { auth } = this.props;
    // console.log('%c App rendered', 'background:red; color:white');
    // console.log(`%cProps`, 'background:red; color:white', this.props);
    return (
      <Router>
        <div className={'bg-dark vh-100 overflow-auto'}>
          <CustomNav />
          <Switch>
            {/*<Route*/}
            {/*  exact*/}
            {/*  path={'/'}*/}
            {/*  render={(props) => {*/}
            {/*    if (this.props.posts.length === 0) {*/}
            {/*      return (*/}
            {/*        <Container*/}
            {/*          className={*/}
            {/*            'vh-100 d-flex align-items-center justify-content-center'*/}
            {/*          }*/}
            {/*        >*/}
            {/*          <Spinner variant={'light'} animation={'border'} />*/}
            {/*        </Container>*/}
            {/*      );*/}
            {/*    }*/}
            {/*    return <PostsList {...props} data={this.props.posts} />;*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path={'/login'}*/}
            {/*  render={(props) => {*/}
            {/*    return <Login {...props} />;*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path={'/signup'}*/}
            {/*  render={(props) => {*/}
            {/*    return <Signup {...props} />;*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*  path={'/logout'}*/}
            {/*  render={() => {*/}
            {/*    return <h1 className={'text-white mt-5'}>logout</h1>;*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<PrivateRoute*/}
            {/*  path={'/settings'}*/}
            {/*  component={Settings}*/}
            {/*  isLoggedIn={auth.isLoggedIn}*/}
            {/*/>*/}
            {/*<PrivateRoute*/}
            {/*  path={'/user/:id'}*/}
            {/*  component={User}*/}
            {/*  isLoggedIn={auth.isLoggedIn}*/}
            {/*/>*/}
            <Route
              path={'/'}
              render={() => {
                return (
                  <h1
                    className={
                      'text-white mt-5 text-center vh-100 d-flex align-items-center justify-content-center'
                    }
                  >
                    API is currently down so page is not available
                  </h1>
                );
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
    auth: state.auth,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
