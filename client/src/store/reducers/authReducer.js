const initState = {
  isAuthenticated: null,
  authMessage: "",
  user: {id:'',name:'',last_name:'',role:0},
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("Login Success");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        authMessage: null,
      };
    case "LOGIN_ERROR":

      return {
        ...state,
        authMessage: action.err.response.data.msg,
      };
    case "REGISTER_SUCCESS":
    console.log("Sign up success");
      return {
        ...state,
        user: action.payload.user,
        authMessage: "Registered, you can now login!",
      };
    case "REGISTER_ERROR":

      return {
        ...state,
        authMessage: action.err.response.data.msg,
      };
    case "AUTH_ERROR":

      return {
        ...state,
        authMessage: action.err.response.data.msg,
      };
    case "LOGIN_EXPIRED":
      console.log("Login expired");
      return {
        ...state,
        isAuthenticated: false,
        user: {id:'',name:'',last_name:'',role:0},
      };
    case "LOGOUT_SUCCESS":
      console.log("Log out success");
      console.log(action);
      return {
        ...state,
        isAuthenticated: false,
        user: {id:'',name:'',last_name:'',role:0},
        authMessage: null,
      };
    case "LOGOUT_ERROR":
      console.log("Log out error");
      console.log(action);
      return {
        ...state,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        authMessage: null,
      };
    default:
      return state;
  }
};

export default authReducer;
