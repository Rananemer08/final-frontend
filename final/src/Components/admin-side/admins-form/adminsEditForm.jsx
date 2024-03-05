import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminsEditForm.css";

const EditAdminsForm = ({ refresh, setIsOpen, singleAdmin }) => {
  const [data, setData] = useState(singleAdmin ?? {});
  const [editedPassword, setEditedPassword] = useState(singleAdmin?.password ?? "");

  useEffect(() => {
    setData(singleAdmin ?? {});
    setEditedPassword(singleAdmin?.password ?? "");
  }, [singleAdmin]);

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    try {
      const { _id, password, ...updatedUserWithoutPassword } = data;
  
      if (!_id) {
        console.error("User ID is missing.");
        return;
      }
  
      const updatedUserData = { ...updatedUserWithoutPassword };
  
      if (editedPassword !== "") {
        updatedUserData.password = editedPassword;
      }
  
      const response = await axios.put(
        `http://localhost:4000/api/users/${updatedUserWithoutPassword._id}`,
        updatedUserData
      );
      
  
      console.log(response);
      refresh("a");
      setIsOpen(false);
    } catch (error) {
      console.error("Error editing admin:", error);
    }
  };
  

  return (
    <div className="form-container-edit-admins">
      <form onSubmit={handleEditAdmin} className="form-edit-admins">
        <div className="inputs-container-edit">
          <div className="input-label-container-admins">
            <div className="input-label-container-admins-edit">
              <label className="label-admins">
                Username
                <input
                  type="text"
                  value={data.username || ""}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                  }}
                />
              </label>
            </div>
            <div className="input-label-container-admins-edit">
              <label className="label-admins">
                Password
                <input
                  type="password"
                  value={editedPassword}
                  onChange={(e) => setEditedPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="admins-buttons-container">
          <div className="cancel-admins-1">
            <button
              className="cancel-button-admins"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div className="edit-admins-1">
            <button className="edit-button-admins" type="submit">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAdminsForm;
