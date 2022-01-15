import React, { Component } from "react";
import "./index.scoped.css";

import logo from "../../img/fazztrack.jpg";

export default class index extends Component {
  render() {
    return (
      <main>
        <div id="main">
          <img src={logo} alt="" />
          <div class="fof">
            <h1>Error 404</h1>
          </div>
        </div>
      </main>
    );
  }
}
