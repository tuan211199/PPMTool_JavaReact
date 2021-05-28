import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogAction";
import { useParams } from "react-router";

function UpdateProjectTask({
  getProjectTask,
  updateProjectTask,
  project_task,
  errors,
  history,
}) {
  const { backlog_id, pt_id } = useParams();
  const [formData, setFormData] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: "",
    dueDate: null,
  });

  const { summary, acceptanceCriteria, status, priority, dueDate } = formData;

  useEffect(() => {
    getProjectTask(backlog_id, pt_id, history);
  }, [getProjectTask]);

  useEffect(() => {
    setFormData({
      summary: project_task.summary ? project_task.summary : "",
      acceptanceCriteria: project_task.acceptanceCriteria
        ? project_task.acceptanceCriteria
        : "",
      status: project_task.status ? project_task.status : "",
      priority: project_task.priority ? project_task.priority : "",
      dueDate: project_task.dueDate ? project_task.dueDate : "",
    });
  }, [project_task]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const updatePT = {
      id: project_task.id,
      projectSequence: project_task.projectSequence,
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      priority: priority,
      dueDate: dueDate,
      projectIdentifier: project_task.projectIdentifier,
      create_At: project_task.create_At,
    };
    updateProjectTask(
      project_task.projectIdentifier,
      project_task.projectSequence,
      updatePT,
      history
    );
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to={`/projectBoard/${project_task.projectIdentifier}`}
              className="btn btn-light"
            >
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Update Project Task</h4>
            <p className="lead text-center">
              Project Name: {project_task.projectIdentifier} | Project Task ID:{" "}
              {project_task.projectSequence}
            </p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.summary,
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  value={summary}
                  onChange={(e) => onChange(e)}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={acceptanceCriteria}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>
              <h6 className="mt-3">Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={dueDate}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group mt-3">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  value={priority}
                  onChange={(e) => onChange(e)}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <div className="form-group mt-3">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={status}
                  onChange={(e) => onChange(e)}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
