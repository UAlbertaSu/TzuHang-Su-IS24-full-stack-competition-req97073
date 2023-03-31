import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Edit product component
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
    const[oldId, setOldId] = useState(props.productId);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function updateProduct(product){
        
        const response = await fetch(`${API_URL}product/${oldId}/`, {
            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        // handle the response
        if (response.status === 404 || response.status === 400 || response.status === 500){
            alert('make sure product id is the same or does not exist ');
            console.log("Error")
            setError(true);
        }
        else{
            const data = await response.json();
            console.log('Success:', data);
            
            handleClose();
        }
    }
    // process the changes made to the variables before sending the PUT request
    const handleUpdate =(e) =>{

        e.preventDefault();
        // if somethign is left empty
        if (productId === '' || productName === '' || productOwnerName === '' || Developers === '' || scrumMasterName === '' || methodology === ''){
            alert('Please fill out every field');
            setError(true);
        }
        else{
            // pass each variable to the updateProduct function
            e.preventDefault();
            updateProduct({
                "productId": parseInt(productId),
                "productName": productName,
                "productOwnerName": productOwnerName,
                "Developers": Developers.toString().split(','),
                "scrumMasterName": scrumMasterName,
                "startDate": startDate,
                "methodology": methodology   
            });
            location.reload();
        }
    };
    // delete product
    function deleteHandler(){
        fetch(`${API_URL}product/${productId}/`, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          location.reload();
          handleClose();
         
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
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
          <Button variant="danger" onClick = {deleteHandler}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;