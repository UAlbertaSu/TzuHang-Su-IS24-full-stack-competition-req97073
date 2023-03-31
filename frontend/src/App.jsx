import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';


import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ProductTable from './components/ProductTable.jsx'

const API_URL = 'http://localhost:8000/api/';

function App() {

  const [productData, setProductData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  

  async function initalsearchProducts(){
    const response = await fetch(`${API_URL}product/`);
    const data = await response.json();

    setProductData(data)

  }
  async function searchProducts(id){

   
      const response = await fetch(`${API_URL}product/${id}/`);
      if (response.status === 404 || response.status === 400){
        setProductData([]);
      }
      else{
        const data = await response.json();
        setProductData(data);  
      }    
  }

  function deleteHandler(id){
    fetch(`${API_URL}product/${id}/`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      initalsearchProducts('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  function editHandler(id){
    fetch('${API_URL}product/${id}/', {
      method: 'PUT',
    });
  }
  
  useEffect(() =>{
    initalsearchProducts('');

  },[] )

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
        <Button type="button" className="btn btn-danger btn-sm"
        onClick ={() => {deleteHandler(searchTerm)}}
        >
          delete
        </Button>
        {productData.length > 0 
          ? (
            <div>
              <ProductTable productData = {productData}/>
            </div>
        ) : (
          <div>No Products Found</div> )
        }
    </div>
  )
}

export default App
