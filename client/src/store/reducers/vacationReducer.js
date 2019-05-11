const initState = {
  vacations: [],
  msg: "",
  loading:false
};

const vacationReducer = (state = initState, action) => {
  switch (action.type) {
    case "VACATIONS_LOADING":
    case "VACATIONS_SUCCESS":
      return {
        ...state,
        vacations: action.payload,
      };
    case "VACATIONS_ERROR":
      return state;
    case "DELETE_SUCCESS":
      let newVacations = state.vacations.filter(v => v._id !== action.id);
      return {
        ...state,
        vacations: newVacations,
      };
    case "DELETE_ERROR":
      return state;
    case "VACATION_LOADING":
      return state;
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        vacations: [...state.vacations, action.payload],
        msg: "Vacation uploaded!",
      };
    case "UPLOAD_ERROR":
      return {
        ...state,
        msg: "Upload failed. check the form!",
      };
    case "UPDATE_SUCCESS":
      let updatedVacation = state.vacations.find(
        v => v._id === action.payload._id
      );
      updatedVacation["destination"] = action.payload.destination;
      updatedVacation["info"] = action.payload.info;
      updatedVacation["price"] = action.payload.price;
      updatedVacation["startDate"] = action.payload.startDate;
      updatedVacation["endDate"] = action.payload.endDate;
      return {
        ...state,
        vacations: [...state.vacations],
      };
    case "UPDATE_ERROR":
      return {
        ...state,
      };
    case "FOLLOW_SUCCESS":
      let followedVacation = state.vacations.find(
        v => v._id === action.payload._id
      );
      followedVacation["followers"] = action.payload.followers;
      followedVacation["follows"] = action.payload.follows;
      return {
        ...state,
        vacations: [...state.vacations],
        loading:false
      };
    case "FOLLOW_ERROR":
      return {
        ...state,
        loading: false
      };
    case "UNFOLLOW_SUCCESS":
      let unfollowedVacation = state.vacations.find(
        v => v._id === action.payload._id
      );
      unfollowedVacation["followers"] = action.payload.followers;
      unfollowedVacation["follows"] = action.payload.follows;
      return {
        ...state,
        vacations: [...state.vacations],
        loading: false
      };
    case "UNFOLLOW_ERROR":
      return {
        ...state,
        loading: false
      };
    case "FOLLOW_LOADING":
      return {
        ...state,
        loading: true
      }
    case "CLEAR_ERRORS":
      return {
        ...state,
        msg: "",
      };
    default:
      return state;
  }
};

export default vacationReducer;
