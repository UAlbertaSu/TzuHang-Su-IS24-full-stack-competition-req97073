import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import ProductTable from './components/ProductTable.jsx'

const API_URL = 'http://localhost:8000/api/';

const productData1 = {
  "productId": 2,
  "productName": "Product2",
  "productOwnerName": "Owner2",
  "Developers": [
      "Developer_1",
      "Developer_6",
      "Developer_7",
      "Developer_8",
      "Developer_9",
      "Developer_10"
  ],
  "scrumMasterName": "Scrum_Master_1",
  "startDate": "2022/03/27",
  "methodology": "Waterfall"
}

function App() {

  const [productData, setProductData] = useState([]);
  
  async function searchProducts(){
    const response = await fetch(`${API_URL}product/`);
    const data = await response.json();

    setProductData(productData1);
    console.log(productData1);
  }
  
  useEffect(() =>{
    searchProducts();
  },[] )
  return (
    <div>
      <h1>Active Products!</h1>
      <input 
        placeholder = "Search for a product, developer or scrum master!"
        value =""
        onChange = {() => {}}
      />
      <button 
        type="button" 
        className="btn btn-primary btn-sm" 
        onClick ={() => {}}
        >
          Search
        </button>
        <ProductTable productData1= {productData1} />
    </div>
  )
}

export default App
