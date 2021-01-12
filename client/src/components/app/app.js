import React, { useState } from "react";
import "./app.css";
import Intel from "../intel/intel";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Defence from "../defence/defence";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:8080");
let testOutput;

function test() {
  socket.emit("test", "steve is gay");
}

function App() {
  const [testData, setTestData] = useState("");
  const location = useLocation();

  if (testOutput == null) {
    testOutput = socket.on("testOutput", (data) => {
      console.log(data);
      setTestData(data);
    });
  }

  return (
    <div className="App">
      <Navbar />
      <main>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <Switch location={location}>
              <Route exact path="/">
                <Redirect to="/defence" />
              </Route>
              <Route path="/defence" component={Defence} />
              <Route path="/intel" component={Intel} />
              <Route component={Error} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <button onClick={test}>TEST</button>

      <span className="test">{testData}</span>

      <Footer />
    </div>
  );
}

export default App;
