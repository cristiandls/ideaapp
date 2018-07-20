import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Login from './Login';
import { setAuthListener, setAuthUser } from '../actions/authActions';
import Main from './Main';

class Root extends Component {
  componentDidMount() {
    const authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.props.setAuthUser(user);
    });

    this.props.setAuthListener(authSubscription);
  }

  componentWillUnmount() {
    const { authSubscription } = this.props.auth;

    console.log(this.props);

    //Eliminar el listener
    authSubscription();
  }

  renderRootScreen() {
    const { authLoading, user } = this.props.auth;

    //Si está cargando la autorización devolver el spinner
    if (authLoading) {
      return (
        <View style={styles.container}>
          <Text>Cargando....</Text>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    //Si hay un usuario logueado
    if (user) {
      return (
        <Main />
      );
    }

    //Si no está cargando y no hay un usuario logueado mostrar login
    return (
      <Login />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderRootScreen()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setAuthListener: (authSubscription) => dispatch(setAuthListener(authSubscription)),
  setAuthUser: (user) => dispatch(setAuthUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
