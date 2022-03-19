import { combineReducers } from "redux";
import * as actiontype from "../actions/type";

const initialState = {
  currentUser: null,
  isLoading: true,
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actiontype.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  user: user_reducer,
});
