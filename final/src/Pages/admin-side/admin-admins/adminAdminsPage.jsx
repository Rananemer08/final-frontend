import AdminsTable from "../../../Components/admin-side/admin-table/admins-table.jsx";
import { useState, useEffect } from "react";
import AdminsAddForm from "../../../Components/admin-side/admins-form/adminsAddForm.jsx";
import AdminsEditForm from "../../../Components/admin-side/admins-form/adminsEditForm.jsx"
import axios from "axios";
import "./adminAdminsPage.css";


const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [refreshPage, setRefreshPage] = useState("");
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [singleAdmin, setSingleAdmin] = useState({});

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setAdmins(response.data.data);
        console.log("Response data:", response.data.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
    fetchAdmins();
  }, [refreshPage]);

  const refPage = (refresh) => {
    setRefreshPage(refreshPage + refresh);
  };

  const handleChangeObject = (obj) => {
    setSingleAdmin(obj);
    setOpenEditForm(true);
    console.log("Edited object:", obj);
  };

  return (
    <div className="admins-page-container-admin">
      {open && <AdminsAddForm refresh={refPage} setIsOpen={setOpen} />}
      {openEditForm && (
        <AdminsEditForm
          setIsOpen={setOpenEditForm}
          refresh={refPage}
          singleAdmin={singleAdmin}
        />
      )}
      <div className="add-button-icon">
        <button
          type="button"
          className="add-button"
          onClick={() => setOpen(true)}
        >
          <span className="button__text">Add Item</span>
          <span className="button__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      </div>

      <AdminsTable
        admin={admins}
        handleChangeObject={handleChangeObject}
        refresh={refPage}
      />
    </div>
  );
};

export default AdminsPage;
