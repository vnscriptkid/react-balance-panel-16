import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import classnames from "classnames";

class ClientDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };

  handleEditBalance = e => {
    this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate });
  };

  handleClientDelete = e => {
    const { client, firestore } = this.props;

    firestore.delete({ collection: "clients", doc: client.id }).then(() => {
      this.props.history.push("/");
    });
  };

  handleBalanceSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: balanceUpdateAmount
    };

    firestore
      .update({ collection: "clients", doc: client.id }, clientUpdate)
      .then(() => {
        this.setState({ showBalanceUpdate: !this.state.showBalanceUpdate });
      });
  };

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceUpdateForm = null;
    if (showBalanceUpdate) {
      balanceUpdateForm = (
        <form>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="New Balance"
              name="balanceUpdateAmount"
              value={balanceUpdateAmount}
              onChange={this.onChangeInput}
            />

            <input
              type="submit"
              value="Update"
              className="btn btn-outline-dark"
              onClick={this.handleBalanceSubmit}
            />
          </div>
        </form>
      );
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={this.handleClientDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <hr />

          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>

            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-success": parseFloat(client.balance) > 0,
                        "text-danger": parseFloat(client.balance) === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                    <i
                      className="fas fa-pencil-alt"
                      onClick={this.handleEditBalance}
                    />
                  </h3>
                  {balanceUpdateForm}
                </div>
              </div>

              <hr />

              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
