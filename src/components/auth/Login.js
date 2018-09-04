import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    console.log(this.state);
    const { email, password } = this.state;
    const { firebase } = this.props;

    firebase
      .login({ email, password })
      .then(() => console.log("success login"))
      .catch(err =>
        this.props.notifyUser("Invalid Login Credentials", "error")
      );
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Login
                </span>
              </h1>
              <form onSubmit={this.handleSubmitForm}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Login);
