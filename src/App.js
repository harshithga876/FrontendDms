import React, { Component } from "react";
import Login from "./Login.js";
import Toolbarhr from "./Components/Toolbarhr";
import ToolbarEmp from "./Components/ToolbarEmp";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from "react-router-dom/Route";
import ViewListhr from "./Components/ViewListhr.js";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/ToolbarEmp" exact component={ToolbarEmp} />
            <Route path="/Toolbarhr" exact component={Toolbarhr} />
            <Route path="/ViewListhr" exact component={ViewListhr} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
