import { useAuthContext } from "./hooks/useAuthContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/cartContext'; // Adjust the path accordingly
import React, { useState, useEffect } from 'react';
import Home from "./Pages/Home/Home";
import ProductsList from './Pages/ProductsList/ProductsList';
import Blogs from './Pages/Blogs/Blogs';
import ReadBlog from './Pages/ReadBLogById/ReadBlogBId';
import ContactUs from './Pages/ContactUs/ContactUs';
// import Cart from './Pages/Cart/Cart';
import AddToCart from "./Pages/AddToCard/AddToCart";
import OnePageProduct  from "./Pages/OnePageProduct/OnePageProduct";
import Findus from "./Pages/FindUs/FindUs";
import Checkout from './Pages/Checkout/Checkout';
import RegisterPage from './Pages/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login/Login';
import AdminCategoriesPage from "./Pages/admin-side/admin-categories/adminCategoriesPage";
// import Testing from "./Pages/testing/testing"
import AdminBlogsPage from "./Pages/admin-side/admin-blogs/adminBlogsPage";
import AdminCarouselsPage from "./Pages/admin-side/admin-carousels/adminCarouselsPage";
import Sidebar from "./Components/admin-side/sidebar/sidebar.jsx"
import Reviews from './Components/reviews';
import FindUs from './Pages/FindUs/FindUs';
import Bot from './Components/bot';
// import AdminForm from './pages/admin-side/admin-admins/adminAdminsPage.jsx'
import OrderForm from "./Components/admin-side/order-form/order-form.jsx"
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import ScrollToTop from './ScrollToTop.jsx';
import AdminOrder from "./Pages/admin-side/admin-order/admin-order.jsx";
import { ProtectedRoute } from './ProtectedRoute.js';
import {ProtectedRouteAdmin} from "./ProtectedRouteAdmin.js";
import AccessDenied from "./AccessDenied.jsx";
import AdminForm from "./Pages/admin-side/admin-admins/adminAdminsPage.jsx"
import AdminProductsPage from "./Pages/admin-side/admin-products/adminProductsPage.jsx";
// import Sidebar from "./Components/admin-side/sidebar/sidebar.jsx"
import AddREVIEW from "./Components/addreview.jsx";
// import AdminLogin from "./Pages/admin-side/admin-login/adminLogin.jsx"



// const AdminLayout = () => {
//   return (
//     <>
//       <Sidebar />
//       <div className="layout">
//         {/* <Outlet /> */}
//       </div>
//     </>
//   );
// };

function App() {
  const { admin } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken') || null;
    if(token !== null)
      setIsLoggedIn(true);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>

        <CartProvider>
        {/* <Bot/> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:categoryId" element={<ProductsList />} />
            <Route path="/Add" element={< AddREVIEW />} />
            
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/products" element={<ProductsList />} />

            <Route path="/readblog/:id" element={<ReadBlog />} />
            <Route path="/contactus" element={<ContactUs />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
            <Route path="/addToCart" element={<AddToCart />} />
            <Route path="/product/:id" element={<OnePageProduct />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<Checkout/>} path="/checkout" exact/>
{/*                 
            </Route>
            <Route element={<ProtectedRouteAdmin />}>
            {/* <Route element={<Sidebar/>} path="/sidebar" exact/> */}
                {/* <Route element={<AdminCategoriesPage/>} path="/categoriesAdmin" exact/> */}
                
            </Route> 
            <Route path="/findus" element={<Findus />} />
            <Route path="/review" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
          < Route path="/register" element={<RegisterPage />}/>



          <Route path="/admin/admins" element={<AdminForm />} />

          <Route path="/accessDenied" element={<AccessDenied />} />
          {/* <Route path="admins" element={<AdminForm />} /> */}
          {/* <Route path="adminlogin" element={<AdminLogin />} /> */}
          {/* <Route
        path="/admin"
        element={admin ? <AdminLayout /> : <Navigate to="/adminlogin" />}
      ></Route> */}
            <Route path="/admin/categoriesAdmin" element={<AdminCategoriesPage />} />
            <Route path="/admin/blogsAdmin" element={<AdminBlogsPage />} />
            <Route path="/admin/carouselsAdmin" element={<AdminCarouselsPage />} />
             <Route path="/admin/ordersAdmin" element={<OrderForm />} />
             <Route path="/admin/orderDetails/:id" element={<AdminOrder />} />
        <Route path="/sidebar" element={<Sidebar />} /> 
        {/* <Route path="productsAdmin" element={<AdminProductsPage />} /> */}
    
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
