import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logOutUser } from '../actions/authActions';
import i18n from '../i18n';

class Main extends Component {
  onLogOutPress() {
    //Desloguear al usuario
    firebase.auth().signOut();

    //Si se logueo a travéz de google
    if (this.props.auth.googleSignIn) {
      GoogleSignin.revokeAccess();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Icon.Button
            name="sign-in"
            backgroundColor="#DB4437"
            onPress={this.onLogOutPress.bind(this)}
          >{i18n.t('button_logout')}
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
  logOutUser: () => dispatch(logOutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
