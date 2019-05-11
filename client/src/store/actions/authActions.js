import Axios from "axios";

//Auth
export const auth = (credentials) => {
  return dispatch => {
    
    Axios.post("/api/login")
      .then(res => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_EXPIRED", err });
      });
    
  };
};

//Login
export const login = (credentials, history) => {
  return dispatch => {
    Axios.post("/api/login", credentials)
      .then(res => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }).then(() => {
        history.push('/');
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

//Register
export const register = (credentials, history) => {
  return dispatch => {
    Axios.post("/api/register", credentials)
      .then(res => {
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      })
      .then(() => history.push("/login"))
      .catch(err => {
        dispatch({ type: "REGISTER_ERROR", err });
      });
  };
};

//Logout
export const logout = (history) => {
  return dispatch => {
    Axios.post("/api/logout")
      .then(res => {
        dispatch({ type: "LOGOUT_SUCCESS", payload: res.data });
      }).then(() => {history.push('/login')})
      .catch(err => {
        dispatch({ type: "LOGOUT_ERROR", err });
      });
  };
};

//Clear Errors
export const clearErrors = () => {
  return dispatch => {
    dispatch({type: "CLEAR_ERRORS"});
  };
};