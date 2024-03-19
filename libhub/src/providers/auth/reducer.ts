interface AuthState {
    isAuthenticated: boolean;
    authToken: string | null;
  }
  
  interface Action {
    type: string;
    payload?: string; // Payload is optional, as it's only used for the LOGIN action
  }
  
  const initialState: AuthState = {
    isAuthenticated: false,
    authToken: null,
  };
  
  const authReducer = (state: AuthState, action: Action): AuthState => {
    console.log("action", action);
    console.log("state", state);
    switch (action.type) {
      case 'LOGIN':
        return {
          isAuthenticated: true,
          authToken: action.payload || null, // Use action.payload if provided, otherwise set to null
        };
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          authToken: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  