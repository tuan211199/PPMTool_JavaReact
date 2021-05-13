import "./App.css";
import store from "./store";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import AddProject from "./components/project/AddProject";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Fragment } from "react";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
