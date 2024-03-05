// import React from "react";
// import "./adminLogin.css";
// import { useAuthContext } from "../../../hooks/useAuthContext";
// import { useLogin } from "../../../hooks/useLogin";
// import { useState } from "react";

// const adminLogin = () => {
//   const { dispatch } = useAuthContext();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, error, isLoading } = useLogin();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(username, password);
//   };

//   return (
//     <div
//       className="admin-login-page vh-100 d-flex align-items-center justify-content-between "
//       onSubmit={handleSubmit}
//     >
//       <form className="admin-login-form d-flex flex-column align-items-center gap-3  px-5 py-5">
//         <h3 className="text-center my-0">Admin Panel</h3>
//         <div className="form-group">
//           <label>username:</label>
//           <input
//             type="text"
//             className="form-control admin-username-input"
//             placeholder="Enter username"
//             onChange={(e) => setUsername(e.target.value)}
//             value={username}
//           />
//         </div>

//         <div className="form-group">
//           <label>password:</label>
//           <input
//             type="password"
//             className="form-control admin-password-input"
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//         </div>
//         <div className="d-flex w-100 justify-content-center">
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="admin-login-button btn btn-light w-25 my-0 p-1 mx-1"
//           >
//             Login
//           </button>
//         </div>
//         {error && <div className="alert alert-danger error p-1">{error}</div>}
//       </form>
//     </div>
//   );
// };

// export default adminLogin;
