// import React, { useState } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// import axios from 'axios';

// const ReviewForm = ({ show, handleClose, updateReviews }) => {
//   const [reviewContent, setReviewContent] = useState('');

//   const handleSubmitReview = async () => {
//     try {
//       // Assuming you have userId available in the context
//       const response = await axios.post('http://localhost:4000/api/review', {
//         text: reviewContent,
//         userId: userId, // Pass userId here
//       });
//       console.log('Review creation response:', response.data);
//       updateReviews(); // Update reviews after successful submission
//       handleClose(); // Close the modal
//     } catch (error) {
//       console.error('Error creating review:', error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Write a Review</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group controlId="formReviewContent">
//             <Form.Label>Review</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               placeholder="Write your review here..."
//               value={reviewContent}
//               onChange={(e) => setReviewContent(e.target.value)}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmitReview}>
//           Submit Review
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ReviewForm;
