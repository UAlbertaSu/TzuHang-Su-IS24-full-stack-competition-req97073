import { useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ProductTable from './components/ProductTable.jsx'
import AddProduct from './components/AddProduct';
const API_URL = 'http://localhost:8000/api/';

function App() {

  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false)
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productOwnerName, setProductOwnerName] = useState("");
  const [Developers, setDevelopers] = useState("");
  const [scrumMasterName, setScrumMasterName] = useState("");
  const [methodology, setMethodology] = useState("");
  const [startDate, setStartDate] = useState("");
  const isInitialMount = useRef(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // an add request (POST)
  async function addProduct(product){
        
    const response = await fetch(`${API_URL}product/`, {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    });
    // handle errors (mostlikely product ID already exist)
    if (response.status === 404 || response.status === 400 || response.status === 500){
        alert("Product ID already exist");
        setError(true);
    }
    // response is good, reload the page to show the new product
    else{
        const data = await response.json();
        console.log('Success:', data);
        handleClose();
        location.reload();
    }
}
// process the changes made to the variables before sending the POST request
const handleUpdate =(e) =>{

    e.preventDefault();
    // if any of the fields are empty, alert the user 
    if (productId === '' || productName === '' || productOwnerName === '' || Developers === '' || scrumMasterName === '' || methodology === ''){
        alert('Please make sure all fields are filled out');
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
// when page first gets rendered, fetch all the products
  async function initalsearchProducts(){
    const response = await fetch(`${API_URL}product/`);
    const data = await response.json();

    setProductData(data)

  }
  // GET request to search for a product by either ID, developer or scrum master
  async function searchProducts(id){

    if (id ===''){
      initalsearchProducts();
    }
    else{
        const response = await fetch(`${API_URL}product/${id}/`);
        if (response.status === 404 || response.status === 400){
          setProductData([]);
        }
        else{
          const data = await response.json();
          setProductData(data);  
        }
    }    
  }

  


  
  useEffect(() =>{
    if (productData.length){
      return;
    }
    else{
      initalsearchProducts();
    }
    

  },[productData] )

  if(typeof(productData)==='undefined'){
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <h1>Active Products!</h1>
      <input 
        placeholder = "Search for a product, developer or scrum master!"
        value ={searchTerm}
        onChange = {(e) => setSearchTerm(e.target.value)}
      />
      <Button 
        type="button" 
        className="btn btn-primary btn-sm" 
        onClick ={() => searchProducts(searchTerm)}
        >
          Search
        </Button>
        
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
          <Modal.Title>Add new Product</Modal.Title>
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
        {productData.length > 0 
          ? (
            <div>
              <ProductTable productData = {productData}/>
              <p>Products queried: {productData.length}</p>
            </div>
        ) : (
          <div>No Products Found</div> )
        }
    </div>
  )
}

export default App
