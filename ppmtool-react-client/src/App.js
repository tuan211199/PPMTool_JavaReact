import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/Dashboard";
import Header from "./components/layout/Header";
import AddProject from "./components/project/AddProject";
import UpdateProject from "./components/project/UpdateProject";
import ProjectBoard from "./components/projectBoard/ProjectBoard";
import AddProjectTask from "./components/projectBoard/projectTasks/AddProjectTask";
import UpdateProjectTask from "./components/projectBoard/projectTasks/UpdateProjectTask";
import Landing from "./components/layout/Landing";
import Register from "./components/userManagement/Register";
import Login from "./components/userManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUltis/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityAction";
import SecuredRoute from "./securityUltis/secureRoute";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decode = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode,
  });

  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="App">
            <Header />

            {
              // public route
            }
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              // Private route
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />
              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
