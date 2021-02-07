import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Routes } from "globals/routes.js";
import Navbar from "components/navbar/navbar";
import Footer from "components/footer/footer";
import Intel from "components/intel/intel";
import IntelDetails from "components/intel-details/intel-details"
import Statistics from "components/statistics/statistics";
import About from "components/about/about";
import "./app.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Switch location={location}>
          <Route exact path="/"><Redirect to={Routes.Intel} /></Route>
          <Route exact path={Routes.Intel} component={Intel} />
          <Route exact path={Routes.IntelID} component={IntelDetails} />
          <Route exact path={Routes.Statistics} component={Statistics} />
          <Route exact path={Routes.About} component={About} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
