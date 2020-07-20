import React, { Component } from "react";

import "./navbar.css";

export default class HeaderNavbar extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/politicalParties">Political Parties</a>
          </li>
          <li>
            <a href="/searchcandidates">Search Candidates</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li style={{ float: "right" }}>
            <a class="active" href="#about">
              About
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
