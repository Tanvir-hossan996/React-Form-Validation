import * as actiontype from "./type";

export const setUser = (user) => {
  return {
    type: actiontype.SET_USER,
    payload: {
      currentUser: user,
    },
  };
};
