import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./order-form.css";

const OrderForm = () => {
 const [orders, setOrders] = useState([]);
 const [refreshPage, setRefreshPage] = useState("");
 const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders`);
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
 }, [refreshPage]);

 const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/orders/${id}`);
      setRefreshPage(prev => prev + 1); // Trigger re-fetch by updating refreshPage
    } catch (error) {
      console.error("Error deleting order:", error);
    }
 };

 const handleSearch = (e) => {
    setSearchTerm(e.target.value);
 };

 const filteredOrders = orders.filter((order) =>
    order.deliveryAddress.receiverName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
 );

 return (
    <div className="orders-wrapper">
      <section className="orders-admin-table">
        <h1 className="orders-header">Orders</h1>
        <div className="search-bar">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by customer name..."
          />
        </div>
        <div className="orders-table">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>City</th>
                <th>Delivered</th>
                <th>Paid</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding={0} cellSpacing={0} border={0}>
            <tbody>
              {filteredOrders.map((order) => {
                // Calculate total amount for each order
                const totalAmount = order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

                return (
                 <tr key={order._id}>
                    <td>{order.deliveryAddress.receiverName}</td>
                    <td>{order.deliveryAddress.city}</td>
                    <td>{order.isDelivered ? "Yes" : "No"}</td>
                    <td>{order.isPaid ? "Yes" : "No"}</td>
                    <td>{totalAmount.toFixed(2)}</td> {/* Display total amount */}
                    <td>
                      <button
                        type="button"
                        className="delete-button-orders"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this order?")) {
                            deleteOrder(order._id);
                          }
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`/admin/orderDetails/${order._id}`}>
                        <button className="view-button-orders">View</button>
                      </Link>
                    </td>
                 </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
 );
};

export default OrderForm;
