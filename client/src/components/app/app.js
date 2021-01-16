import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import "./app.css";
import { Routes } from "globals/routes.js";
import Intel from "components/intel/intel";
import Navbar from "components/navbar/navbar";
import Defence from "components/defence/defence";
import Footer from "components/footer/footer";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <main>
        <TransitionGroup>
          <CSSTransition classNames="page" key={location.key} timeout={300} unmountOnExit>
            <Switch location={location}>
              <Route exact path="/"><Redirect to={Routes.Defence} /></Route>
              <Route path={Routes.Defence} component={Defence} />
              <Route path={Routes.Intel} component={Intel} />
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
