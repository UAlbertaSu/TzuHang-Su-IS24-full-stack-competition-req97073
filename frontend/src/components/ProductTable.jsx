import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';
function ProductTable({ productData1 }){

    return (
        <table className="table table-bordered">
        <thead>
            <tr>
            <th scope="col">id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Owner</th>
            <th scope="col">Developers</th>
            <th scope="col">Scrum Master</th>
            <th scope="col">Start Date</th>
            <th scope="col">Methodology</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">{productData1.productId}</th>
            <td>{productData1.productName}</td>
            <td>{productData1.productOwnerName}</td>
            <td>{productData1.Developers.slice(0, 5? 5: productData1.Developers.length).join(" ")}</td>
            <td>{productData1.startDate}</td>
            <td>{productData1.methodology}</td>
            </tr>
        </tbody>
        </table>

    );
}

export default ProductTable;