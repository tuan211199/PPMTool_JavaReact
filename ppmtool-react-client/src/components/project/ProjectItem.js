import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

function ProjectItem({
  project: {
    id,
    projectName,
    projectIdentifier,
    description,
    start_date,
    end_date,
  },
  deleteProject,
}) {
  const onDelete = (id) => {
    deleteProject(id);
  };

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <span className="mx-auto">{projectIdentifier}</span>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{projectName}</h3>
            <p>{description}</p>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <ul className="list-group">
              <a href="#">
                <li className="list-group-item board">
                  <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                </li>
              </a>
              <Link to={`/updateProject/${projectIdentifier}`}>
                <li className="list-group-item update">
                  <i className="fa fa-edit pr-1"> Update Project Info</i>
                </li>
              </Link>
              <li
                className="list-group-item delete"
                onClick={(e) => onDelete(projectIdentifier)}
              >
                <i className="fa fa-minus-circle pr-1"> Delete Project</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectItem);
