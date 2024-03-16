import "./carouselsAddForm.css";
import { useState } from "react";
import axios from "axios";

const CarouselAddForm = ({ refresh, setIsOpen }) => {
  const [data, setData] = useState({
    image: null,
    title: " ",
    subtitle: " ",
  });

  const handleAddCarousel = async (e) => {
    e.preventDefault();

    try {
      const fData = new FormData();
      fData.append("image", data.image);
      fData.append("title", data.title);
      fData.append("subtitle", data.subtitle);

      const response = await axios.post(
        "http://localhost:4000/api/carousels",
        fData
      );
      console.log(response);
      refresh("a");
      setIsOpen(false);
    } catch (error) {
      // Check if the response status is 400
      if (error.response && error.response.status === 400) {
        // Display the error message to the user
        alert(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="form-container-carousel">
      <form onSubmit={handleAddCarousel} className="form-submit-carousel">
        <div className="inputs-container">
          <div className="input-label-container-carousel">
            <label className="label-carousel">
              Carousel title
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
            </label>
          </div>
          <div className="input-label-container-carousel">
            <label className="label-carousel">
              Carousel subtitle
              <input
                type="text"
                value={data.subtitle || ""}
                onChange={(e) => {
                  setData({ ...data, subtitle: e.target.value });
                }}
              />
            </label>
          </div>
          <label className="label-carousel">
              Carousel subtitle
              <input
                type="text"
                value={data.subtitle || ""}
                onChange={(e) => {
                  setData({ ...data, subtitle: e.target.value });
                }}
              />
            </label>
          <div className="input-label-container-carousel">
            <label className="label-carousel">
              Carousel Image
              <input
                type="file"
                onChange={(e) => {
                  setData({ ...data, image: e.target.files[0] });
                }}
              />
              <div className="custom-file-input">Choose File</div>
              <div className="selected-file-name">
                {data.image ? data.image.name : "No file chosen"}
              </div>
            </label>
          </div>
        </div>
        <div className="carousel-buttons-container">
          <div className="cancel-carousel-1">
            <button
              className="cancel-button-carousel"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
          <div className="add-carousel-1">
            <button className="add-button-carousel" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CarouselAddForm;
