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
  NavigatorIOS
} from 'react-native';

import DashboardView from './App/Views/DashboardView';
import CookieManager from 'react-native-cookies';

import LoginView from './App/Views/LoginView';

export default class IamReact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initialRoute: {
        title: 'Login',
        component: LoginView
      },
      isCookieLoaded: false
    }  
  }

  componentWillMount() {

    this.getAccounts();
    
    CookieManager.getAll().then(
      (res) => {
        if (res.login_cookie) {
          this.setState({
            initialRoute: {
              title: 'Dashboard',
              component: DashboardView
            },
            isCookieLoaded: true
          })
        } else {
          this.setState({ isCookieLoaded: true });
        }
      }
    );
  }

  async getAccounts() {
    try {
      let response = await fetch('https://foo.com/api/v1/authenticate/accounts',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'jm@abc.com'
          })
        }
      );
      let responseJson = await response.json();
      console.log('POST accounts  =>', JSON.stringify(responseJson));

      let responseSelectAcct = await fetch('https://foo.com/api/v1/authenticate/accounts/select',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              "auth_ctx": {
                "response_type": "code",
                "client_id": "gateway-hjn2t7wixihk8s1k6iajyhf_e",//gateway-hjn2t7wixihk8s1k6iajyhf_e",
                "scope": "openid",
                "redirect_uri": "https://foo.com:443/oidc",
                "state": "https://foo.com:443/api/v1/session/login?redirect_uri=https://foo.com/homepage&cacheBuster=2.0.0_242"
              },
              "account": {
                "user_id": "5f11b346-1c6b-4a3b-a592-19ea72eeba2c",
                "username": "jm@abc.com",
                "org_id": "c17d5e19-f06f-4d84-aca1-ba4e1e31d872",
                "orgname": "ABC",
                "email": "js@abc.com",
                "user_type": "primary"
              }
            }
          )
        }
      );
      let responseJsonSelectAcct = await responseSelectAcct.json();


      console.log('POST select account  =>', JSON.stringify(responseJsonSelectAcct));
      
      let responsePassword = await fetch('https://foo.com/api/v1/authenticate/password',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({"user_id":"5f11b346-1c6b-4a3b-a592-19ea72eeba2c","password":"ggsgs!234"})
        }
      );
      let responseJsonPassword = await responsePassword.json();
      console.log('POST pasword  =>', JSON.stringify(responseJsonPassword));


    } catch(error) {
      console.error(error);
    }
  }

  render() {

    let initialRoute = {
      title: 'Login',
      component: LoginView
    }
    if(this.state.isCookieLoaded){
      return (
        
        <NavigatorIOS
          navigationBarHidden={true}
          style={styles.container}
          tintColor='#FF6600'
          initialRoute={this.state.initialRoute}/>
      );
    } else {
      return <View/>
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('IamReact', () => IamReact);
