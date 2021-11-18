import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {INCREASE} from "../../redux/actions/CounerActions";
import { DELETE_TOKEN } from "../../redux/actions/AuthActions";
import { Link } from 'react-router-dom';

const Home = () => {
  const count = useSelector((state) => state.CounterReducer.count);
  const dispatch = useDispatch();

  return (
    <div className="Home">
      <nav>
        <Link to="/about">About</Link>
        <Link to="/login" onClick={()=>{
          localStorage.removeItem("jwtToken");
          dispatch(DELETE_TOKEN());
        }}>Log out</Link>
      </nav>
      <h2>Welcome to the Home page</h2>
      <p>This page demonstrates a working login system</p>
      <h4>Number is: {count}</h4>
      <button onClick={() => dispatch(INCREASE())}>+</button>
    </div>
  );
}

export default Home
