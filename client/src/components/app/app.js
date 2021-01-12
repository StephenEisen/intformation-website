import React from 'react';
import './app.css';
import Intel from '../intel/intel';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import Defence from '../defence/defence';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
        <main>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={300}
              classNames="page"
              unmountOnExit>
                <Switch location={location}>
                  <Route exact path="/"><Redirect to="/defence"/></Route>
                  <Route path="/defence" component={Defence} />
                  <Route path="/intel" component={Intel} />
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
