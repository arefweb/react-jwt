
const initState = {
  token: "",
  isAuth: false,
  code: null
};

const AuthReducer = (state=initState, action)=>{
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };

    case "SET_IS_AUTH":
      return { ...state, isAuth: action.payload };

    case "SET_STATUS_CODE":
      return { ...state, code: action.payload };

    case "DELETE_TOKEN":
      return {...state, token: "", isAuth: false}

    default:
      return state;
  }
}

export default AuthReducer;

