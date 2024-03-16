import { useState, useEffect } from "react";
import axios from "axios";
import "./carouselsEditForm.css";

const EditCarouselForm = ({ refresh, setIsOpen, singleCarousel }) => {
  const [data, setData] = useState(singleCarousel);

  useEffect(() => {
    setData(singleCarousel);
  }, [singleCarousel]);

  const handleEditCarousel = async (e) => {
    e.preventDefault();
    try {
      const fData = new FormData();
      fData.append("image", data.image);
      fData.append("title", data.title);
      fData.append("subtitle", data.subtitle);
      
      const response = await axios.put(
        `http://localhost:4000/api/carousels/${data._id}`,
        fData
      );
      console.log(response);
      refresh("a");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="form-container-edit-carousel">
      <form onSubmit={handleEditCarousel} className="form-edit-carousel">
        <div className="inputs-container-edit">

          <div className="input-label-container-carousel">
          <div className="input-label-container-carousel-edit">
            <label className="label-carousel-edit">
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
          <div className="input-label-container-carousel-edit">
            <label className="label-carousel-edit">
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
          
          <div className="input-label-container-carousel-edit">
          <img
              src={`http://localhost:4000/${data.image}`}
              width={"700px"}
              height={"300px"}
              alt={data._id}
            />
          <label className="label-carousel-edit">
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
          <div className="edit-carousel-1">
            <button className="edit-button-carousel" type="submit">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCarouselForm;
