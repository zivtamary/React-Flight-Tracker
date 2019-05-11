import Axios from "axios";

export const getVacations = () => dispatch => {
  dispatch({ type: "VACATIONS_LOADING" });
  Axios.get("/api/vacations")
    .then(res => {
      dispatch({
        type: "VACATIONS_SUCCESS",
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({ type: "VACATIONS_ERROR", err });
    });
};

export const postVacation = (vacation, data, updateVacations) => dispatch => {
  Axios.post("/api/vacations/upload", data)
    .then(() =>
      Axios.post("/api/vacations/new", vacation).then(res => {
        dispatch({ type: "UPLOAD_SUCCESS", payload: res.data.vacation });
        updateVacations()
      })
    )
    .catch(err => {
      dispatch({ type: "UPLOAD_ERROR", err });
      console.log(err);
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: "CLEAR_ERRORS" });
};

export const updateVacation = (newVacation, updateVacations) => dispatch => {
  Axios.put("/api/vacations", newVacation)
    .then(res => {
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      updateVacations()
    })
    .catch(err => {
      dispatch({ type: "UPDATE_ERROR", err });
      console.log(err);
    });
};

export const deleteVacation = (id, updateVacations) => dispatch => {
  Axios.post("/api/vacations/delete", { id })
    .then(res => {
      dispatch({ type: "DELETE_SUCCESS", id });
      updateVacations()
    })
    .catch(err => {
      dispatch({ type: "DELETE_ERROR", err });
      alert("Vacaction did not delete!");
    });
};

export const followVacation = (vacationId, userId) => dispatch => {
  dispatch({type:"FOLLOW_LOADING"})
  Axios.post("/api/vacations/follow", { vacationId, userId })
    .then(res => {
      dispatch({ type: "FOLLOW_SUCCESS", payload: res.data });
    })
    .catch(err => {
      dispatch({ type: "FOLLOW_ERROR", err });
      console.log(err);
    });
};

export const unfollowVacation = (vacationId, userId) => dispatch => {
  dispatch({type:"FOLLOW_LOADING"})
  Axios.post("/api/vacations/unfollow", { vacationId, userId })
    .then(res => {
      dispatch({ type: "UNFOLLOW_SUCCESS", payload: res.data });
    })
    .catch(err => {
      dispatch({ type: "UNFOLLOW_ERROR", err });
      console.log(err);
    });
};