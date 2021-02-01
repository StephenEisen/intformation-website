import React from "react";
import "./app.css";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Routes } from "globals/routes.js";
import Intel from "components/intel/intel";
import IntelDetails from "components/intel-details/intel-details"
import Navbar from "components/navbar/navbar";
import Footer from "components/footer/footer";
import About from "components/about/about";
import Statistics from "components/statistics/statistics";
import Home from "components/home/home";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Switch location={location}>
          <Route exact path="/"><Redirect to={Routes.Intel} /></Route>
          <Route exact path={Routes.Home} component={Home} />
          <Route exact path={Routes.Intel} component={Intel} />
          <Route exact path={Routes.IntelID} component={IntelDetails} />
          <Route exact path={Routes.Statistics} component={Statistics} />
          <Route exact path={Routes.About} component={About} />
          <Route component={Error} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
