import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export const setAuthListener = (authSubscription) => ({
  type: 'set_auth_listener',
  payload: authSubscription
});

export const setAuthLoading = (loading) => ({
  type: 'set_auth_loading',
  payload: loading
});

export const setUser = (user) => ({
  type: 'set_user',
  payload: user
});

export const loginGoogle = () => ({
  type: 'login_google',
  payload: true
});

export const loginEmail = () => ({
  type: 'login_email',
  payload: true
});

export const loginFacebook = () => ({
  type: 'login_facebook',
  payload: true
});

export const loginFailed = (error) => ({
  type: 'login_failed',
  payload: error
});

export const loginWithGoogle = () => async (dispatch) => {
  //Indicar que se está procesado el login
  dispatch(setAuthLoading(true));

  //Blanquear mensaje de error
  dispatch(loginFailed(''));

  try {
    //Ver si tiene google play services instalado. Con autoResolve true le 
    //muestra el popup que debe instalarlo si no lo tiene
    await GoogleSignin.hasPlayServices({ autoResolve: true });

    //Configura la aplicación con el ClientID (sale del google-services.json)
    await GoogleSignin.configure({
      webClientId: '208924667543-416vv79p4f1gae7mtfjmsmphk9vfvl2g.apps.googleusercontent.com',
      offlineAccess: true
    });

    //Obtener el usuario actualmente autenticado con google
    let user = await GoogleSignin.currentUserAsync();

    //Si no se ha autenticado aún
    if (user === null) {
      //Mostrar popup para que seleccione su cuenta de email de google
      user = await GoogleSignin.signIn();
    }

    //Obtener la credencial para autenticarme
    const authCredential =
      firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);

    //Autenticarme con firebase y recuperar datos de usuario
    await firebase.auth().signInAndRetrieveDataWithCredential(authCredential);

    dispatch(loginGoogle(true));
    dispatch(setAuthLoading(false));
  } catch (err) {
    dispatch(loginFailed(err.message));
    dispatch(setAuthLoading(false));
  }
};

export const loginWithFacebook = () => async (dispatch) => {

  //Indicar que se está procesado el login
  dispatch(setAuthLoading(true));

  //Blanquear mensaje de error
  dispatch(loginFailed(''));

  try {
    //Proponer al usuario loguearse con facebook
    const loginfb = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    //Si hizo el login 
    if (!loginfb.isCancelled) {
      const fbtoken = await AccessToken.getCurrentAccessToken();

      //Obtener la credencial para autenticarme
      const credential = firebase.auth.FacebookAuthProvider.credential(fbtoken.accessToken);

      //Autenticarme con firebase y recuperar datos de usuario
      await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      dispatch(loginFacebook(true));
      dispatch(setAuthLoading(false));
    }
  } catch (err) {
    dispatch(loginFailed(err.message)); //acá estoy escribiendo texto
    dispatch(setAuthLoading(false));
  }
};

export const setAuthUser = (user) => (dispatch) => {
  dispatch(setUser(user));
};

export const loginWithEmailAndPassword = (email, password) => async (dispatch) => {
  //Indicar que se está procesado el login
  dispatch(setAuthLoading(true));

  //Blanquear mensaje de error
  dispatch(loginFailed(''));

  try {
    //Identificar con email y passoword
    const pepe = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password);
    console.log(pepe);
    dispatch(loginEmail(true));
    dispatch(setAuthLoading(false));
  } catch (err) {
    dispatch(loginFailed(err.message));
    dispatch(setAuthLoading(false));
  }
};
