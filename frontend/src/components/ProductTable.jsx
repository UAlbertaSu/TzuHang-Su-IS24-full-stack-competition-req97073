import React from 'react';

import EditProduct from './EditProduct.jsx';

// product table component
function ProductTable({ productData }){
 
    
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
            <th scope="col"></th>
            </tr>
        </thead>

        <tbody>
            {productData.map((product) =>
                <tr key = {product.productId}>
                <th scope="row">{product.productId}</th>
                <td>{product.productName}</td>
                <td>{product.productOwnerName}</td>
                <td>{product.Developers.slice(0, 5? 5: product.Developers.length).join(" ")}</td>
                <td>{product.scrumMasterName}</td>
                <td>{product.startDate}</td>
                <td>{product.methodology}</td>
                <td>
                    <div>
                        <EditProduct props = {product}/>
                    </div>
                </td>
            </tr>
            )}
        </tbody>
        </table>

    );
}

export default ProductTable;