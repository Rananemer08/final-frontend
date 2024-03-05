import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const SingleProductPage = () => {
 const { productID } = useParams();
 const [product, setProduct] = useState(null);
 const [showReviewModal, setShowReviewModal] = useState(false);
 const [reviewContent, setReviewContent] = useState("");
 const [token, setToken] = useState(localStorage.getItem("token"));
 const [userId, setUserId] = useState(
    token ? JSON.parse(atob(token.split(".")[1])).id : null
 );

 const navigate = useNavigate();

 useEffect(() => {
    fetchProduct(productID);
 }, [productID]);

 const fetchProduct = async (productId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/products/${productId}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while fetching the product.',
      });
    }
 };

 const handleWriteReviewClick = () => {
    if (!product) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Product not found.',
      });
      return;
    }
    setShowReviewModal(true);
 };

 const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setReviewContent("");
 };

 const handleSubmitReview = async () => {
    if (!product || !product.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Product not found.',
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/reviews",
        {
          productId: product.id,
          message: reviewContent,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Review submitted successfully.',
      });
      handleCloseReviewModal();
      fetchProduct(productID);
    } catch (error) {
      console.error("Error creating review:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while submitting the review.',
      });
    }
 };

 return (
    <div className="singleproductpage-main">
      <div className="Reviews-title-line"></div>
      <h2 className="Reviews-title">
        Reviews ({product ? product.Reviews.length : 0})
      </h2>
      <h5 className="Reviews-title-create" onClick={handleWriteReviewClick}>
        Write A Review
      </h5>
      <div className="Reviews">
        {product &&
          product.Reviews.map((review) => (
            <div key={review.id} className="review">
              <p> {review.User.username}</p>
              <p>{review.message}</p>
            </div>
          ))}
      </div>

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formReviewContent">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your review here..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
 );
};

export default SingleProductPage;
