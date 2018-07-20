const initialState = {
  authSubscription: null,
  authLoading: false,
  user: '',
  emailSignIn: false,
  googleSignIn: false,
  facebookSignIn: false,
  error: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'set_auth_listener':
      return {
        ...state,
        authSubscription: action.payload
      };
    case 'set_auth_loading':
      return {
        ...state,
        authLoading: action.payload
      };
    case 'set_user':
      return {
        ...state,
        user: action.payload
      };
    case 'login_email_password':
      return {
        ...state,
        emailSignIn: action.payload
      };
    case 'login_google':
      return {
        ...state,
        googleSignIn: action.payload
      };
    case 'login_facebook':
      return {
        ...state,
        facebookSignIn: action.payload
      };
    case 'login_failed':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
