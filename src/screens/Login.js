import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  loginWithEmailAndPassword,
  loginWithGoogle,
  loginWithFacebook
} from '../actions/authActions';
import i18n from '../i18n';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'cristiandelasota@hotmail.com',
      password: '123456',
    };
  }

  loginWithEmailAndPassword() {
    const { email, password } = this.state;
    this.props.loginWithEmailAndPassword(email, password);
  }

  errorLogin() {
    const { error } = this.props.auth;
    return (
      <FormValidationMessage>{error}</FormValidationMessage>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>{i18n.t('label_email')}</FormLabel>
          <FormInput
            placeholder={i18n.t('placeholder_email')}
            onChangeText={texto => this.setState({ email: texto })}
            value={email}
            keyboardType='email-address'
          />
          <FormLabel>{i18n.t('label_password')}</FormLabel>
          <FormInput
            placeholder={i18n.t('placeholder_password')}
            onChangeText={texto => this.setState({ password: texto })}
            value={password}
            secureTextEntry
          />
          {this.errorLogin()}
        </View>
        <View>

          <Icon.Button
            name="sign-in"
            backgroundColor="#0336FF"
            onPress={this.loginWithEmailAndPassword.bind(this)}
          >{i18n.t('button_login')}
          </Icon.Button>

          <Icon.Button
            name="google"
            backgroundColor="#4285F4"
            onPress={this.props.loginWithGoogle}
          >{i18n.t('button_login_google')}
          </Icon.Button>

          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.props.loginWithFacebook}
          >{i18n.t('button_login_facebook')}
          </Icon.Button>

          <Icon.Button
            name="user-plus"
            backgroundColor="#9C26B0"
            onPress={this.loginWithEmailAndPassword.bind(this)}
          >{i18n.t('button_register')}
          </Icon.Button>

        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  loginWithEmailAndPassword: (email, password) =>
    dispatch(loginWithEmailAndPassword(email, password)),
  loginWithGoogle: () => dispatch(loginWithGoogle()),
  loginWithFacebook: () => dispatch(loginWithFacebook())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
