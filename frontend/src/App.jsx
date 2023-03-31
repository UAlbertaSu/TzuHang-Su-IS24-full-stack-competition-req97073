import { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import './App.css'

const API_URL = 'http://localhost:8000/api/';

function App() {

  const searchProducts = async () => {
    const response = await fetch(`${API_URL}product/`);
    const data = await response.json();

    console.log(data);
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
      <button type="button" class="btn btn-primary">Submit</button>
    </div>
  )
}

export default App
