import React from "react";
import { Router } from "@reach/router";
import { css } from "react-emotion";

import Home from './views/Home';
import ComponentDoc from './views/ComponentDoc';

import Header from './components/Header';

const sgContainer = css`
  display: flex;
  height: 100vh;
`

const sgMain = css`
  flex: 1 0 auto;
  padding: 24px;
`

const App = ({}) => {
  return(
    <div className={sgContainer}>
      <Header></Header>
      <Router className={sgMain}>
        <Home path="/" />
        <ComponentDoc path="component/:component" />
      </Router>
    </div>
  );
}

export default App;