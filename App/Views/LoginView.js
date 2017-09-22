/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

import CookieManager from 'react-native-cookies';

import DashboardView from './DashboardView';

export default class LoginView extends Component {

  constructor(props) {
    super(props)
    this.state = {
       username: '',
      password: ''
    }
  }

  handleGoToDashboard() {
    this.props.navigator.push({
      title: 'Dashboard',
      component: DashboardView
    })
  }

  handleSubmitLogin() {
    if (this.state.username && this.state.password) {
      this.setLoginCookie()
    }
  }

  setLoginCookie(data) {
    let date = new Date()
    date.setDate(date.getDate() + 7)
    /*
    CookieManager.set({
      name: 'login_cookie',
      value: this.state.username,
      domain: 'mandiant.com',
      origin: 'mandiant.com',
      path: '/',
      version: '1',
      expiration: date.toJSON()
    }, (err, res) => {
      console.log('Cookie set')
      console.log(res)
      console.log(err)
      this.handleGoToDashboard()    
     })
     */

     CookieManager.set({
      name: 'login_cookie',
      value: 'myValue',
      domain: 'localhost',
      origin: 'localhost',
      path: '/',
      version: '1',
      expiration: '2018-05-30T12:30:00.00-05:00'
      }).then((res) => {
        console.log('CookieManager.set =>', res);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to IAM!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username" 
          value={this.state.username} 
          onChangeText={(text) => { this.setState({ username: text }) }} />
        <TextInput
          style={styles.input}
          placeholder="Password" 
          value={this.state.password}
          secureTextEntry={true} 
          onChangeText={(text) => { this.setState({ password: text }) }} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmitLogin.bind(this)} >
          <Text>Submit</Text>
        </TouchableHighlight>
        <Text style={styles.instructions} onPress={this.handleGoToDashboard.bind(this)}>
            Go to Dashboard
        </Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white', 
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  }
});

//AppRegistry.registerComponent('IamReact', () => IamReact);
