import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderNavbar from "./components/navbar/navbar.component";
import SearchCandidates from "./components/SearchCandidates/SearchCandidate.component";
import PartyTable from "./components/PartyList/PartyList.component";
import Footer from "./components/Footer/Footer.component";
function App() {
  return (
    <Router>
      <HeaderNavbar />
      <Route path="/" exact component={SearchCandidates} />
      <Route path="/politicalParties" exact component={PartyTable} />
      <Footer />
    </Router>
  );
}

export default App;
