import React from "react";
import "./delete-dialog.css";

const DeleteDialog = (props) => {

  const closeDialog = (response) => {
    props.close(response);
  }

  return (
    <div className="delete-dialog">
      <div className="delete-modal">
        <div className="delete-content">
          {/* HEADER */}
          <div className="delete-header">
            <h1>Are you sure you want to delete this?</h1>
          </div>
          {/* ACTIONS */}
          <div className="delete-actions">
          <button className="slide-btn-horizontal" onClick={() => closeDialog(true)}>
              <span className="slide-btn-text">Delete</span>
            </button>

            <button className="slide-btn-horizontal" onClick={() => closeDialog(false)}>
              <span className="slide-btn-text">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
