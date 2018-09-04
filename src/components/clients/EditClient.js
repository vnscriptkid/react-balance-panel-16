import React, { Component } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstName = React.createRef();
    this.lastName = React.createRef();
    this.phone = React.createRef();
    this.email = React.createRef();
    this.balance = React.createRef();
  }

  onSubmitForm = e => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    const updatedClient = {
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      phone: this.phone.current.value,
      email: this.email.current.value,
      balance: this.balance.current.value
    };

    // console.log(updateClient);
    firestore
      .update({ collection: "clients", doc: client.id }, updatedClient)
      .then(() => {
        history.push("/");
      });
  };

  render() {
    const { settings } = this.props;
    if (this.props.client) {
      const { firstName, lastName, email, phone, balance } = this.props.client;
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
            <div className="card-header">Edit Client</div>
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
                    ref={this.firstName}
                    defaultValue={firstName}
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
                    ref={this.lastName}
                    defaultValue={lastName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    ref={this.email}
                    defaultValue={email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    required
                    ref={this.phone}
                    defaultValue={phone}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <input
                    type="number"
                    className="form-control"
                    name="balance"
                    required
                    ref={this.balance}
                    defaultValue={balance}
                    disabled={settings.disableBalanceOnEdit}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Edit Now
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
