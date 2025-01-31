import React from 'react'
import productImage from "../../assets/amir-hanna-sweUF7FcyP4-unsplash.jpg";
import Product from "../../components/Product"
import { Routes, Route } from "react-router-dom"

const HomePage = () => {
    return (
        <>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>
            <Product imageUrl={productImage}></Product>

            {/* <Routes>
                <Route path="/" element={<Product />} />
            </Routes> */}
        </>
    )
}

export default HomePage