import { useState, useEffect } from "react";
import axios from "axios";
import "./blogsEditForm.css";

const EditBlogForm = ({ refresh, setIsOpen, singleBlog }) => {
  const [blogs, setBlogs] = useState([]);
  console.log('console(singleBlog)',singleBlog)
  const [data, setData] = useState({
    title: "",
    text: "",
    image: null,
    date: "",
  });
  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      ...singleBlog,
    }));
  }, [singleBlog]);

  const handleEditBlog = async (e) => {
    e.preventDefault();
    if (!data._id) {
      alert('Blog ID is not set. Cannot proceed with the edit.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("text", data.text);
      formData.append("date", data.date);
  
      await axios.put(
        `http://localhost:4000/api/blogs/${data._id}`,
        formData
      );
      refresh("a");
      setIsOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
  

  return (
    <div className="form-container-edit-blog">
      <form onSubmit={handleEditBlog} className="form-edit-blog">
        <div className="inputs-container-edit">
          <div className="input-label-container-blog-edit">
            <label className="label-blog-edit">
              Blog Title
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </label>
          </div>
          <div className="input-label-container-blog-edit">
            <img
              src={`http://localhost:4000/uploads/${data.image}`}
              width={"700px"}
              height={"300px"}
              alt={data._id}
            />
          </div>
          <div className="input-label-container-blog">
            <label className="label-blog-edit">
              Blog Image
              <input
                type="file"
                onChange={(e) => setData({ ...data, image: e.target.files[0] })}
              />
              <div className="custom-file-input">Choose File</div>
              <div className="selected-file-name">
                {data.image ? data.image.name : "No file chosen"}
              </div>
            </label>
          </div>

          <div className="input-label-container-blog-edit">
            <label className="label-blog-edit">
              Date
              <input
                type="date"
                value={data.date}
                onChange={(e) => setData({ ...data, date: e.target.value })}
              />
            </label>
          </div>
          <div className="input-label-container-blog-edit">
            <label className="label-blog-edit">
              Text
              <textarea
                rows={5}
                cols={65}
                value={data.text}
                onChange={(e) => setData({ ...data, text: e.target.value })}
              />
            </label>
          </div>
        </div>
        <div className="blog-buttons-container">
          <div className="cancel-blog-1">
            <button
              className="cancel-button-blog"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
          <div className="edit-blog-1">
            <button className="edit-button-blog" type="submit">
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlogForm;
