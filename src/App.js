import React from "react";
import Router from "./Router";
import "./components/@vuexy/rippleButton/RippleButton";
import State from "./context/State";
import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const App = (props) => {
  return (
    <>
      <State>
        <Router />
      </State>
    </>
  );
};

export default App;
