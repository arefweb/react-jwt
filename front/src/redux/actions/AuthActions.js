
export const SET_TOKEN = (token)=>{
  return {
    type: "SET_TOKEN",
    payload: token
  }
}

export const SET_IS_AUTH = (status) => {
  return {
    type: "SET_IS_AUTH",
    payload: status,
  };
};

export const SET_STATUS_CODE = (code) => {
  return {
    type: "SET_STATUS_CODE",
    payload: code,
  };
};

export const DELETE_TOKEN = () => {
  return {
    type: "DELETE_TOKEN",
  };
};