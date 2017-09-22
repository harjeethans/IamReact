// DashboardView.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import CookieManager from 'react-native-cookies';

import LoginView from './LoginView';

export default class DashboardView extends Component {

  handleGoToLogin() {
    this.props.navigator.push({
      title: 'Login',
      component: LoginView
    })
  }

  handleLogout() {
    CookieManager.clearAll().then(
      (res) => {
        console.log('cookies cleared!');
      }
    );
    this.props.navigator.push({
      title: 'Login',
      component: LoginView
    });
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          I'm the second route!
        </Text>
        <TouchableHighlight  
          onPress={this.handleLogout.bind(this)}
          style={styles.button}>
          <Text>Logout</Text>
        </TouchableHighlight>

        <Text onPress={this.handleGoToLogin.bind(this)}>Go to Login</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: 'white', 
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  }
});