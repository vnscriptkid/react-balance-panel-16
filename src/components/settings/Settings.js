import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from "../../actions/settingsActions";

class Settings extends Component {
  handleSettingChange = e => {
    const {
      setAllowRegistration,
      setDisableBalanceOnAdd,
      setDisableBalanceOnEdit
    } = this.props;
    switch (e.target.name) {
      case "disableBalanceOnAdd":
        setDisableBalanceOnAdd();
        return;
      case "disableBalanceOnEdit":
        setDisableBalanceOnEdit();
        return;
      case "allowRegistration":
        setAllowRegistration();
        return;
      default:
        return;
    }
  };

  render() {
    const {
      disableBalanceOnAdd,
      disableBalanceOnEdit,
      allowRegistration
    } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Edit Settings</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="disableBalanceOnAdd"
                  checked={!!disableBalanceOnAdd}
                  onChange={this.handleSettingChange}
                />
                <label className="ml-1" htmlFor="disableBalanceOnAdd">
                  Disable Balance On Add
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="disableBalanceOnEdit"
                  checked={!!disableBalanceOnEdit}
                  onChange={this.handleSettingChange}
                />
                <label className="ml-1" htmlFor="disableBalanceOnEdit">
                  Disable Balance On Edit
                </label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.handleSettingChange}
                />
                <label className="ml-1" htmlFor="allowRegistration">
                  Allow Registration
                </label>
              </div>

              <input
                type="submit"
                value="Save"
                className="btn btn-block btn-primary"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
