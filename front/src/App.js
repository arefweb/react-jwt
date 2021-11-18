import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import LoaderPage from "./Pages/LoaderPage/LoaderPage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SET_TOKEN, SET_IS_AUTH, SET_STATUS_CODE } from "./redux/actions/AuthActions";



function App() {

  const dispatch = useDispatch();
  const code = useSelector((state) => state.AuthReducer.code);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("http://localhost:4000/auth");
        console.log(response);
        dispatch(SET_TOKEN(response.config.headers["x-access-token"]));
        dispatch(SET_IS_AUTH(response.data.isAuth));
        dispatch(SET_STATUS_CODE(response.status));
      } catch (error) {
        // console.log(error);
        dispatch(SET_TOKEN(""));
        dispatch(SET_IS_AUTH(false));
      }
    }
    getUser();
  }, []);
  
  return (
    <AppWrapper>
      <Router>
        {code ? (
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path="/about">
              <About />
            </PrivateRoute>
            <Route exact path="/login" component={Login} />
          </Switch>
        ) : (
          <LoaderPage />
        )}
      </Router>
    </AppWrapper>
  );
}


function PrivateRoute({ children, ...rest }) {
  const isAuth = useSelector((state) => state.AuthReducer.isAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}


function AppWrapper({children}){
  const dispatch = useDispatch();

  axios.interceptors.request.use(
    function (request) {
      request.headers["x-access-token"] = localStorage.getItem("jwtToken");

      return request;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(SET_STATUS_CODE(error.response.status));
      }
      return error;
    }
  );

  return(
    <div>
      {children}
    </div>
  )
}

export default App;
