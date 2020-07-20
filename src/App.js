import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderNavbar from "./components/navbar/navbar.component";
import District from "./components/District/district.component";
import PoliticalParties from "./components/PoliticalParties/PoliticalParties.component";

function App() {
  return (
    <Router>
      <HeaderNavbar />
      <Route path="/politicalParties" exact component={PoliticalParties} />
      <Route path="/" exact component={District} />
    </Router>
  );
}

export default App;
