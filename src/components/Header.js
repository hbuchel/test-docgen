import React, { Component } from 'react';
import { css } from "react-emotion";

const sgHeader = css`
  background: #ebebeb;
  padding: 24px;
  width: 300px;
`

class Header extends Component {
  render() {
    return (
      <header className={sgHeader} role="banner">
        <a href="">DocGen</a>
      </header>
    )
  }
}

export default Header;
