import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


class UpdateModal extends React.Component {

  
  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.addBook}>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter a book name"
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter a description"
                required
                />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select id="status" name ="status" required> 
              <option>Choose a Status</option>
                <option value="Life Changing">Life Changing</option>
                <option value="Favorite Five">Favorite Five</option>
                <option value="Reccomended To Me">Reccomended To Me</option>
              </Form.Select>
            </Form.Group>
            <Button onClick={this.props.handleClose} variant="primary" type="submit">
             Add Book Now!
            </Button>
          </Form>
        </Modal.Body>
            
      </Modal>
    );
  }
}

export default UpdateModal;