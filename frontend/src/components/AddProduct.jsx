import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function AddProduct() {

    const API_URL = 'http://localhost:8000/api/';

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false)
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [productOwnerName, setProductOwnerName] = useState("");
    const [Developers, setDevelopers] = useState("");
    const [scrumMasterName, setScrumMasterName] = useState("");
    const [methodology, setMethodology] = useState("");
    const [startDate, setStartDate] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function addProduct(product){
        
        const response = await fetch(`${API_URL}product/`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        if (response.status === 404 || response.status === 400 || response.status === 500){
            console.log("Error")
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
            addProduct({
                "productId": parseInt(productId),
                "productName": productName,
                "productOwnerName": productOwnerName,
                "Developers": Developers.split(','),
                "scrumMasterName": scrumMasterName,
                "startDate": startDate,
                "methodology": methodology   
            });
        }
        
    };
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn btn-success btn-sm">
        Add
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
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

            <FloatingLabel controlId="floatingInput" label="Start Date" className = "mb-2">
                <Form.Control type="text" placeholder="startDate" defaultValue={startDate} onChange = {(e) => {setStartDate(e.target.value)}}/>
            </FloatingLabel>


            <FloatingLabel controlId ="floatingSelect" label = "Methodology">
                <Form.Select aria-label="Floating label select example" defaultValue={methodology} onChange = {(e) => {setMethodology(e.target.value)}}>
                    <option value = "">Choose...</option>
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
          <Button variant="primary" onClick = {handleUpdate}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;