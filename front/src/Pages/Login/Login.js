import React, { useState } from "react";
import { URL } from "../../API/API";
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN, SET_IS_AUTH, SET_STATUS_CODE } from "../../redux/actions/AuthActions";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  function fireError() {
    return toast.error("اطلاعات نادرست", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, pass: password}),
    };
    fetch(URL + "/login" , requestOptions)
      .then((response) => {
        console.log(response);
        dispatch(SET_IS_AUTH(response.ok));
        dispatch(SET_STATUS_CODE(response.status));
        if(response.status == 401){
          fireError();
        }
        return response.json();
      }).then((data) => {
        console.log(data)
        localStorage.setItem("jwtToken", data.token)
        dispatch(SET_TOKEN(data.token));
      }).then(()=>{
        history.replace(from);
      }).catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div style={{ padding: "15px" }}>
      <h3>Login Form</h3>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email" style={{ display: "block" }}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="pass" style={{ display: "block" }}>
          Password
        </label>
        <input
          type="text"
          name="pass"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Send" style={{ display: "block" }} />
      </form>
    </div>
  );
};

export default Login;
