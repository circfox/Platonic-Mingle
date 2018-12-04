import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Login from './Login';
import { BottomNavigation } from 'react-native-paper';
import api from '../api.js';
import Kitty from './Kitty';
import Trend from './Trend';

const HomeRoute = props => (
  <SafeAreaView>
    <Login {...props} />
  </SafeAreaView>
);

const FavoritesRoute = () => (
  <SafeAreaView>
    <Kitty />
  </SafeAreaView>
);

const ExploreRoute = () => (
  <SafeAreaView>
    <Trend />
  </SafeAreaView>
);

const RecentsRoute = () => <Text>Recents</Text>;

class Home extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'login', title: 'Login', icon: 'home' },
      { key: 'favorites', title: 'Favorites', icon: 'favorite-border' },
      { key: 'recents', title: 'Recents', icon: 'share' },
      { key: 'explore', title: 'Trends', icon: 'person-outline' }
    ],
    user: null,
    username: '',
    password: ''
  };

  componentDidMount = async () => {
    this.getUser();
  };

  _handleIndexChange = index => {
    this.setState({ index });
    console.log(index);
  };

  _renderScene = BottomNavigation.SceneMap({
    login: props => (
      <HomeRoute
        {...props}
        handleLogin={this.login}
        updateUsername={this.updateUsername}
        updatePassword={this.updatePassword}
        handleSignup={this.signup}
      />
    ),
    favorites: FavoritesRoute,
    recents: RecentsRoute,
    explore: ExploreRoute
  });

  updateUsername = username => {
    this.setState({ username });
    console.log(username);
  };
  updatePassword = password => {
    this.setState({ password });
    console.log(password);
  };

  getUser = async () => {
    const user = await api.getUser();
    this.setState({ user });
    if (user) {
      this.setState({ index: 1 });
    }
    console.log(user);
  };

  signup = async () => {
    console.log('signing up...');
    try {
      await api.signup(this.state.username, this.state.password);
      this.getUser();
    } catch (err) {
      console.log(err);
    }
  };

  login = async () => {
    console.log('logging in...');
    try {
      await api.login(this.state.username, this.state.password);
      this.getUser();
    } catch (err) {
      console.error(err);
    }
  };

  logout = async () => {
    await api.logout();

    this.setState({ user: null });
  };

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        onPress={this.handlePress}
      />
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#e1e1e1'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e1e1e1'
  }
});
