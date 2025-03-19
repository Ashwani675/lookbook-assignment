import React from 'react';
import { Route, Routes } from 'react-router';
import Lookbook from '../../components /Lookbook';
import ProductDetails from '../../components /ProductDetails';

function AppRouter(props) {
    return (
        <Routes>
            <Route path="/" element={<Lookbook />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
    );
}

export default AppRouter;