import "./order-form.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderForm = () => {
  const [orders, setOrders] = useState([]);
  const [refreshPage, setRefreshPage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(
         `http://localhost:4000/api/orders`
      );
      console.log("hayde el response", response.data.data);
      setOrders(response.data.data);
    };
    fetchOrders();
  }, [refreshPage]);

  const deleteOrder = async (id) => {
    console.log(`Attempting to delete order with ID: ${id}`);
    try {
      const response = await axios.delete(
        
        `http://localhost:4000/api/orders/${id}`
        
      );
      console.log('Server response after deletion', response.data);
      refPage("a");
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  

  const refPage = (refresh) => {
    setRefreshPage(refreshPage + refresh);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter orders based on the search term
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
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.deliveryAddress.receiverName} </td>
                  <td>{order.deliveryAddress.city}</td>
                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                  <td>{order.isPaid ? "Yes" : "No"}</td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <button
                      type="button"
                      className="delete-button-orders"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          deleteOrder(order._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/admin/orderDetails/${order._id}`}>
                      {" "}
                      <button className="view-button-orders"> View</button>
                    </Link>
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

export default OrderForm;
