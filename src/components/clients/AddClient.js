import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const newClient = this.state;
    const { firestore } = this.props;
    firestore.add({ collection: "clients" }, newClient).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    const { settings } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmitForm}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  minLength="2"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  minLength="2"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label htmlFor="balance">Balance</label>
                <input
                  type="number"
                  className="form-control"
                  name="balance"
                  required
                  onChange={this.onChangeInput}
                  value={this.state.balance}
                  disabled={settings.disableBalanceOnAdd}
                />
              </div>

              <button className="btn btn-primary btn-block">Add Now</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

// export default firestoreConnect()(AddClient);

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
