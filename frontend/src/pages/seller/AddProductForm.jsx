import React, { useState } from "react";
import "./AddProductForm.css";

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: "",
        brand: "",
        price: "",
        description: "",
        screenSize: "",
        ram: "",
        storage: "",
        camera: "",
        battery: "",
        processor: "",
        os: "",
        networkSupport: [],
        stock: "",
        images: [],
    });

    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            networkSupport: checked
                ? [...prevData.networkSupport, value]
                : prevData.networkSupport.filter((item) => item !== value),
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + previewImages.length > 5) {
            alert("You can upload up to 5 images.");
            return;
        }

        const previewURLs = files.map((file) => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...previewURLs]);

        setProductData((prevData) => ({
            ...prevData,
            images: [...prevData.images, ...files],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Data Submitted:", productData);

        // Reset the form fields after submission
        setProductData({
            name: "",
            brand: "",
            price: "",
            description: "",
            screenSize: "",
            ram: "",
            storage: "",
            camera: "",
            battery: "",
            processor: "",
            os: "",
            networkSupport: [],
            stock: "",
            images: [],
        });
        setPreviewImages([]);
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>Product Name:</label>
                    <input type="text" name="name" value={productData.name} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Brand:</label>
                    <select name="brand" value={productData.brand} onChange={handleChange} required>
                        <option value="">Select Brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Xiaomi">Xiaomi</option>
                        <option value="Oppo">Oppo</option>
                        <option value="Vivo">Vivo</option>
                        <option value="OnePlus">OnePlus</option>
                        <option value="Google">Google</option>
                        <option value="Huawei">Huawei</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Price ($):</label>
                    <input type="number" name="price" value={productData.price} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={productData.description} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Screen Size (inches):</label>
                    <input type="number" name="screenSize" value={productData.screenSize} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>RAM (GB):</label>
                    <input type="number" name="ram" value={productData.ram} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Storage (GB):</label>
                    <input type="number" name="storage" value={productData.storage} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Camera (MP):</label>
                    <input type="number" name="camera" value={productData.camera} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Battery (mAh):</label>
                    <input type="number" name="battery" value={productData.battery} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Processor:</label>
                    <input type="text" name="processor" value={productData.processor} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Operating System:</label>
                    <select name="os" value={productData.os} onChange={handleChange} required>
                        <option value="">Select OS</option>
                        <option value="Android">Android</option>
                        <option value="iOS">iOS</option>
                        <option value="Windows">Windows</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Network Support:</label>
                    <div className="checkbox-group">
                        {["2G", "3G", "4G", "5G", "WiFi"].map((network) => (
                            <label key={network}>
                                <input
                                    type="checkbox"
                                    value={network}
                                    checked={productData.networkSupport.includes(network)}
                                    onChange={handleCheckboxChange}
                                />
                                {network}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label>Stock:</label>
                    <input type="number" name="stock" value={productData.stock} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Upload Images (Max 5):</label>
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} required />
                    <div className="image-preview">
                        {previewImages.map((image, index) => (
                            <img key={index} src={image} alt={`Preview ${index}`} />
                        ))}
                    </div>
                </div>

                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
