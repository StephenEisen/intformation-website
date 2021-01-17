import React from "react";
import "./app.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { Routes } from "globals/routes.js";
import Intel from "components/intel/intel";
import Navbar from "components/navbar/navbar";
import Defence from "components/defence/defence";
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
        <TransitionGroup>
          <CSSTransition classNames="page" key={location.key} timeout={300} unmountOnExit>
            <Switch location={location}>
              <Route exact path="/"><Redirect to={Routes.Home} /></Route>
              <Route path={Routes.Home} component={Home} />
              <Route path={Routes.Defence} component={Defence} />
              <Route path={Routes.Intel} component={Intel} />
              <Route path={Routes.Statistics} component={Statistics} />
              <Route path={Routes.About} component={About} />
              <Route component={Error} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
}

export default App;
