import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { addProjectTask } from "../../../actions/backlogAction";

function AddProjectTask({ addProjectTask, errors, history }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: "",
  });
  const { summary, acceptanceCriteria, status, priority, dueDate } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      summary: summary,
      acceptanceCriteria: acceptanceCriteria,
      status: status,
      priority: priority,
      dueDate: dueDate,
    };
    addProjectTask(id, newTask, history);
  };

  return (
    <div className="add-PBI">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to={`/projectBoard/${id}`} className="btn btn-light">
              Back to Project Board
            </Link>
            <h4 className="display-4 text-center">Add Project Task</h4>
            <p className="lead text-center">Project Name + Project Code</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.summary,
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  onChange={(e) => onChange(e)}
                  value={summary}
                />
                {errors.summary && (
                  <div className="invalid-feedback">{errors.summary}</div>
                )}
              </div>
              <div className="form-group mt-3 mb-3">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  onChange={(e) => onChange(e)}
                  value={acceptanceCriteria}
                ></textarea>
              </div>
              <h6>Due Date</h6>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  onChange={(e) => onChange(e)}
                  value={dueDate}
                />
              </div>
              <div className="form-group mt-3">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  onChange={(e) => onChange(e)}
                  value={priority}
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
                  onChange={(e) => onChange(e)}
                  value={status}
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

AddProjectTask.propTypes = {
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { addProjectTask })(AddProjectTask);
