import React from 'react';
import { useParams } from 'react-router';

function ProductDetails(props) {
    const { id } = useParams();
    return (
        <div>
            <h1>product no : {id} details here</h1>
        </div>
    );
}

export default ProductDetails;