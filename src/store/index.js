import { createStore } from "redux";

const initialState = {
  currentUser: {
    id: "",
    name: "",
    email: "",
    role: "",
    profilePic: "",
  },
};

const reducer = (state = initialState, action) => {
  if (action.type === "setCurrentUser") {
    return {
      ...state,
      currentUser: action.currentUser,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
