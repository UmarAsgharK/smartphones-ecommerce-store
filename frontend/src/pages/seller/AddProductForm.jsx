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
        images: [], // This will be an array of File objects
    });

    const [previewImages, setPreviewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Create a FormData object
            const formData = new FormData();

            // Append top-level fields
            formData.append("name", productData.name);
            formData.append("brand", productData.brand);
            formData.append("price", productData.price);
            formData.append("description", productData.description);
            formData.append("stock", productData.stock);

            // Append specification fields (you can either flatten these fields, or send as JSON string)
            // Option 1: Flatten the specification fields:
            // Create the specifications object and append it as a JSON string
            const specifications = {
                screenSize: productData.screenSize,
                ram: productData.ram,
                storage: productData.storage,
                camera: productData.camera,
                battery: productData.battery,
                processor: productData.processor,
                os: productData.os,
                networkSupport: productData.networkSupport, // include if needed
            };
            formData.append("specifications", JSON.stringify(specifications));


            // For array fields such as networkSupport, you can append each value individually.
            productData.networkSupport.forEach((network) => {
                // You can use the key "networkSupport[]" if your backend expects an array
                formData.append("networkSupport[]", network);
            });

            // Append each image file.
            // If your backend expects an array, you can name it "images[]" or simply "images" depending on your server-side parser.
            productData.images.forEach((file) => {
                formData.append("images", file);
            });

            // Send the API request to the backend using fetch.
            // Note: Do not manually set the Content-Type header when sending FormData.
            const response = await fetch("http://localhost:5000/api/seller/products", {
                method: "POST",
                credentials: "include", // Ensures cookies (JWT/session) are sent
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create product");
            }

            setSuccessMessage(data.message || "Product created successfully!");

            // Reset the form fields after successful submission
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
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                        <option value="Sony">Sony</option>
                        <option value="LG">LG</option>
                        <option value="Motorola">Motorola</option>
                        <option value="Nokia">Nokia</option>
                        <option value="Realme">Realme</option>
                        <option value="Tecno">Tecno</option>
                        <option value="Infinix">Infinix</option>
                        <option value="Honor">Honor</option>
                        <option value="ZTE">ZTE</option>
                        <option value="Asus">Asus</option>
                        <option value="HTC">HTC</option>
                        <option value="BlackBerry">BlackBerry</option>
                        <option value="Nothing">Nothing</option>
                        <option value="Fairphone">Fairphone</option>
                        <option value="Other">Other</option>
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

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? "Adding Product..." : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
