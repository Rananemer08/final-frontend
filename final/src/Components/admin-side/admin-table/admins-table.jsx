import "./admins-table.css";
import axios from "axios";
import { useState } from "react";

const AdminsForm = ({ admin, handleChangeObject, refresh }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const deleteAdmin = async (id) => {
    try {
      const response = await axios.delete(
         `http://localhost:4000/api/users/${id}`
      );
      console.log(response.data);
      refresh("a");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter admins based on the search term
  const filteredAdmins = admin.filter((admin) =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admins-wrapper">
      <section className="admins-admin-table">
        <h1 className="admins-header">Admins</h1>
        <div className="search-bar">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by admin name..."
          />
        </div>
        <div className="tbl-header">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.username}</td>
                  <td>
                    <input
                      type="password"
                      value={admin.password}
                      readOnly
                      style={{
                        border: "none",
                        background: "none",
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="edit-button-admins"
                      onClick={() => {
                        handleChangeObject(admin);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-button-admins"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          deleteAdmin(admin._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminsForm;
