import CarouselsCard from "../../../Components/admin-side/carousels-card/carouselsCard.jsx";
import { useState, useEffect } from "react";
import CarouselsAddForm from "../../../Components/admin-side/carousels-form/carouselsAddForm.jsx";
import CarouselsEditForm from "../../../Components/admin-side/carousels-form/carouselsEditForm.jsx";
import axios from "axios";
import "./adminCarouselsPage.css";

const CarouselsPage = () => {
  const [carousels, setCarousels] = useState([]);
  const [refreshPage, setRefreshPage] = useState("");
  const [open, setOpen] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [singleCarousel, setSingleCarousel] = useState({});

  useEffect(() => {
    const fetchCarousels = async () => {
      const response = await axios.get("http://localhost:4000/api/carousels");
      console.log("hayde el response", response.data.data);
      setCarousels(response.data.data);
    };
    fetchCarousels();
  }, [refreshPage]);

  const refPage = (refresh) => {
    setRefreshPage(refreshPage + refresh);
  };

    const handleChangeObject = (obj) => {
      setSingleCarousel(obj);
      setOpenEditForm(true);
      console.log("editedObject", obj);
    };

  return (
    <div className="carousels-page-container">
      {open && <CarouselsAddForm refresh={refPage} setIsOpen={setOpen} />}
      {openEditForm && (
        <CarouselsEditForm
          setIsOpen={setOpenEditForm}
          refresh={refPage}
          singleCarousel={singleCarousel}
        />
      )}
      <div className="add-button-icon">
        <button type="button" className="add-button" onClick={() => setOpen(true)}>
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

      <div className="carousel-cards">
        {carousels.map((each) => (
          <CarouselsCard
            key={each._id}
            carousel={each}
            handleChangeObject={handleChangeObject}
            refresh={refPage}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselsPage;
