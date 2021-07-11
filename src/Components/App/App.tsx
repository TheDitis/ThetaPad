//import React from 'react';
import {useReducer, useContext} from "react";
import './App.css';
import ThetaPad from "../ThetaPad/ThetaPad";


const reducer = (current, action) => {
    console.log("action: ", action)
    return current + 1
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
      <div className="App">
        <ThetaPad/>
      </div>
  );
}

export default App;
