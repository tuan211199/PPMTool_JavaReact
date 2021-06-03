import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createNewUser } from "../../actions/securityAction";

function Register({
  createNewUser,
  errors,
  history,
  security: { validToken },
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  const { username, password, fullName, confirmPassword } = formData;

  useEffect(() => {
    if (validToken) history.push("/dashboard");
  }, [validToken]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      fullName: fullName,
      confirmPassword: confirmPassword,
    };

    createNewUser(newUser, history);
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your Account</p>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.fullName,
                  })}
                  placeholder="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => onChange(e)}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.username,
                  })}
                  placeholder="Email Address ( Username )"
                  name="username"
                  value={username}
                  onChange={(e) => onChange(e)}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.password,
                  })}
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group mt-3">
                <input
                  type="password"
                  className={classnames("form-control form-control-lg", {
                    "is-invalid": errors.confirmPassword,
                  })}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => onChange(e)}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { createNewUser })(Register);
