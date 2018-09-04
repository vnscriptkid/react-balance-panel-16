import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <Link to="/client/add" className="btn btn-success">
        <i className="fas fa-plus" /> Add Client
      </Link>
    </div>
  );
};
