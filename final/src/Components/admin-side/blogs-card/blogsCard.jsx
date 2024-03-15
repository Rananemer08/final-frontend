import "./blogsCard.css";
import axios from "axios";

const BlogsAdmin = ({ blog, handleChangeObject, refresh }) => {
  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
         `http://localhost:4000/api/blogs/${blog._id}`
      );
      console.log(response.data);
      refresh("a");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="blogs-admin-container">
      <div className="card" key={blog._id}>
        <div className="blogs-img-container">
        <img src={`http://localhost:4000/${blog.image}`} alt="" />
        </div>
     
        <div className="card-content-blogs">
          <p className="card-title-blogs">{blog.title}</p>
          <p className="card-text-blogs">{blog.text}</p>
          
          <p className="card-date-blogs">{
          new Date(blog.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
          </p>
          <div className="button-container-blogs">
          <span className="edit-span">
            <button
              className="edit-button"
              onClick={() => {
                handleChangeObject(blog);
              }}
            >
              <svg
                className="svg-icon"
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#a649da" strokeLinecap="round" strokeWidth="2">
                  <path d="m20 20h-16"></path>
                  <path
                    clipRule="evenodd"
                    d="m14.5858 4.41422c.781-.78105 2.0474-.78105 2.8284 0 .7811.78105.7811 2.04738 0 2.82843l-8.28322 8.28325-3.03046.202.20203-3.0304z"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
              <span className="lable">Edit</span>
            </button>
          </span>
            <span className="delete-span">
              <button type="button" className="delete-button" onClick={() => {if (window.confirm("Are you sure you want to delete this user?")){
                deleteBlog(blog._id);
              }}}>
                <span className="button__text">Delete</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="52"
                    viewBox="0 0 512 512"
                    height="25"
                    className="svg"
                  >
                    <path
                        style={{
                          fill: 'none',
                          stroke: ' #A649DA',
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          strokeWidth: '32px',
                        }}
                    ></path>
                    <line
                      y2="112"
                      y1="112"
                      x2="432"
                      x1="80"
                      style={{
                        stroke: ' #A649DA',
                        strokeLinecap: 'round',
                        strokeMiterlimit: 10,
                        strokeWidth: '32px',
                      }}
                    ></line>
                    <path
                      style={{
                        fill: 'none',
                        stroke: ' #A649DA',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                      }}
                      d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
                    ></path>
                    <line
                      y2="400"
                      y1="176"
                      x2="256"
                      x1="256"
                      style={{
                        fill: 'none',
                        stroke: ' #A649DA',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                      }}
                    ></line>
                    <line
                      y2="400"
                      y1="176"
                      x2="192"
                      x1="184"
                      style={{
                        fill: 'none',
                        stroke: ' #A649DA',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                      }}
                    ></line>
                    <line
                      y2="400"
                      y1="176"
                      x2="320"
                      x1="328"
                      style={{
                        fill: 'none',
                        stroke: ' #A649DA',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: '32px',
                      }}
                    ></line>
                  </svg>
                </span>
              </button>
            </span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsAdmin;
