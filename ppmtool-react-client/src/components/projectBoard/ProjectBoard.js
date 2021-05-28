import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Backlog from "./Backlog";
import { getBacklog } from "../../actions/backlogAction";

function ProjectBoard({ getBacklog, backlog: { project_tasks }, errors }) {
  const { id } = useParams();

  useEffect(() => {
    getBacklog(id);
  }, [getBacklog]);

  let BoardContent;

  const boardAlgorith = (errors, project_tasks) => {
    if (project_tasks.length < 1) {
      if (errors.projectNotFound) {
        return (
          <div className="alert alert-danger text-center" role="alert">
            {errors.projectNotFound}
          </div>
        );
      } else {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board
          </div>
        );
      }
    } else {
      return <Backlog project_tasks={project_tasks} />;
    }
  };

  BoardContent = boardAlgorith(errors, project_tasks);

  return (
    <div className="container">
      <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      {BoardContent}
    </div>
  );
}

ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  errors: state.errors,
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
