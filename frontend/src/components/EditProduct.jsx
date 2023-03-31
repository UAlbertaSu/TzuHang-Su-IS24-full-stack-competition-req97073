import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function EditProduct({ props }) {

    const API_URL = 'http://localhost:8000/api/';

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false)
    const [productId, setProductId] = useState(props.productId);
    const [productName, setProductName] = useState(props.productName);
    const [productOwnerName, setProductOwnerName] = useState(props.productOwnerName);
    const [Developers, setDevelopers] = useState(props.Developers);
    const [scrumMasterName, setScrumMasterName] = useState(props.scrumMasterName);
    const [methodology, setMethodology] = useState(props.methodology);
    const [startDate, setStartDate] = useState(props.startDate);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function updateProduct(product){
        
        const response = await fetch(`${API_URL}product/${productId}/`, {
            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        if (response.status === 404 || response.status === 400){
            
            setError(true);
        }
        else{
            const data = await response.json();
            console.log('Success:', data);
            handleClose();
        }
    }
    const handleUpdate =(e) =>{

        e.preventDefault();
        
        if (productId === '' || productName === '' || productOwnerName === '' || Developers === '' || scrumMasterName === '' || methodology === ''){
            alert('Please fill out every field');
            setError(true);
        }
        else{
            e.preventDefault();
            updateProduct({
                "productId": productId,
                "productName": productName,
                "productOwnerName": productOwnerName,
                "Developers": Developers,
                "scrumMasterName": scrumMasterName,
                "startDate": startDate,
                "methodology": methodology   
            });
        }
        
    };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <FloatingLabel
            controlId="floatingInput"
            label="Product ID"
            className="mb-2"
    
        >
            <Form.Control 
                type="text" 
                placeholder="id" 
                defaultValue={productId} 
                onChange = {(e) => {setProductId(e.target.value)}}    
            />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Product Name" className = "mb-2">
                <Form.Control type="text" placeholder="Name" defaultValue={productName} onChange = {(e) => {setProductName(e.target.value)}} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Product Owner" className = "mb-2">
                <Form.Control type="text" placeholder="Owner" defaultValue={productOwnerName} onChange = {(e) => {setProductOwnerName(e.target.value)}}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Developers" className = "mb-2">
                <Form.Control type="text" placeholder="Developers" defaultValue={Developers} onChange = {(e) => {setDevelopers(e.target.value)}}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Scrum Master" className = "mb-2">
                <Form.Control type="text" placeholder="Scrum" defaultValue={scrumMasterName} onChange = {(e) => {setScrumMasterName(e.target.value)}}/>
            </FloatingLabel>

            <FloatingLabel controlId ="floatingSelect" label = "Methodology">
                <Form.Select aria-label="Floating label select example" defaultValue={methodology} onChange = {(e) => {setMethodology(e.target.value)}}>
                    <option value= "Agile">Agile</option>
                    <option value = "Waterfall">Waterfall</option>
                </Form.Select>
            </FloatingLabel>

        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick = {handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;