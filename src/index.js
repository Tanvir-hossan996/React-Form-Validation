import React, { Component } from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registation from "./components/Auth/Registation";
import Login from "./components/Auth/Login";
import { auth } from "./Firebase-config";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducer";

const store = createStore(rootReducer, composeWithDevTools());
class Routing extends Component {
  state = {
    tracker: false,
  };
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ tracker: true });
      } else {
        this.setState({ tracker: false });
      }
    });
  }
  render() {
    return (
      <BrowserRouter>
        {/* {this.state.tracker ? (
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Registation />}></Route>
          </Routes>
        ) : ( */}
        <Routes>
          {/* <Route path="/" element={<App />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Registation />}></Route>
        </Routes>
        {/* )} */}
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Routing />
  </Provider>,
  document.getElementById("root")
);
