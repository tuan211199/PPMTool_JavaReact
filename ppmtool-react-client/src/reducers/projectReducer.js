import { GET_PROJECT, GET_PROJECTS } from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        loading: false,
        project: action.payload,
      };
    default:
      return state;
  }
}
