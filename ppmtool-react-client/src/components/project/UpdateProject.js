import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getProject, createProject } from "../../actions/projectActions";
import { useParams } from "react-router";
import classNames from "classnames";

function UpdateProject({
  getProject,
  createProject,
  project: { project, loading },
  errors,
  history,
}) {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    projectName: "",
    projectIdentifier: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const { projectName, projectIdentifier, description, start_date, end_date } =
    formData;

  useEffect(() => {
    getProject(id, history);
  }, [getProject]);

  useEffect(() => {
    setFormData({
      projectName: project.projectName ? project.projectName : "",
      projectIdentifier: project.projectIdentifier
        ? project.projectIdentifier
        : "",
      description: project.description ? project.description : "",
      start_date: project.start_date ? project.start_date : "",
      end_date: project.end_date ? project.end_date : "",
    });
  }, [project]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updateProject = {
      id: project.id,
      projectName: projectName,
      projectIdentifier: projectIdentifier,
      description: description,
      start_date: start_date,
      end_date: end_date,
    };
    createProject(updateProject, history);
  };

  return (
    <div className="project">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h5 className="display-4 text-center">Update Project form</h5>
            <hr />
            <form className="mt-3" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectName,
                  })}
                  placeholder="Project Name"
                  name="projectName"
                  onChange={(e) => onChange(e)}
                  value={projectName}
                />
                {errors.projectName && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.projectIdentifier,
                  })}
                  placeholder="Unique Project ID"
                  name="projectIdentifier"
                  onChange={(e) => onChange(e)}
                  value={projectIdentifier}
                  disabled
                />
                {errors.projectIdentifier && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <textarea
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.description,
                  })}
                  placeholder="Project Description"
                  name="description"
                  onChange={(e) => onChange(e)}
                  value={description}
                ></textarea>
                {errors.description && (
                  <div className="invalid-feedback">{errors.projectName}</div>
                )}
              </div>
              <h6 className="mt-3">Start Date</h6>
              <div className="form-group mt-1">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  onChange={(e) => onChange(e)}
                  value={start_date}
                />
              </div>
              <h6 className="mt-3">Estimated End Date</h6>
              <div className="form-group mt-1">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  onChange={(e) => onChange(e)}
                  value={end_date}
                />
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
