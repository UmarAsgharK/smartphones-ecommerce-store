import React, { useState, useEffect } from "react";
import Product from "../../components/Product";
import "./ProductsListing.css";

// Filter options (adjust these lists as needed)
const brandOptions = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Oppo",
    "Vivo",
    "OnePlus",
    "Google",
    "Huawei",
    "Sony",
    "LG",
    "Motorola",
    "Nokia",
    "Realme",
    "Tecno",
    "Infinix",
    "Honor",
    "ZTE",
    "Asus",
    "HTC",
    "BlackBerry",
    "Nothing",
    "Fairphone",
    "Other",
];

const osOptions = ["Android", "iOS", "Windows"];
const ramOptions = ["3GB", "4GB", "6GB", "8GB"];
const storageOptions = ["64GB", "128GB", "256GB"];
const batteryOptions = ["2000-3000", "3000-4000", "4000+"];
const cameraOptions = ["12MP", "48MP", "50MP", "64MP"];

const ProductsPage = () => {
    // State for products coming from the backend
    const [products, setProducts] = useState([]);

    // State for search input
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");

    // State for filter sidebar (selections & applied filters)
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedOS, setSelectedOS] = useState([]);
    const [selectedRAM, setSelectedRAM] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedBattery, setSelectedBattery] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState([]);

    const [appliedFilters, setAppliedFilters] = useState({
        brands: [],
        os: [],
        ram: [],
        storage: [],
        battery: [],
        camera: [],
    });

    // Fetch products from the backend on component mount
    useEffect(() => {
        // Adjust the URL as necessary for your environment
        fetch("http://localhost:5000/api/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Handler for applying search
    const handleSearch = () => {
        setAppliedSearch(searchTerm);
    };

    // Toggle selection in the sidebar filters
    const toggleSelection = (option, selectedArray, setSelected) => {
        if (selectedArray.includes(option)) {
            setSelected(selectedArray.filter((o) => o !== option));
        } else {
            setSelected([...selectedArray, option]);
        }
    };

    // Apply the filters from the sidebar
    const handleApplyFilters = () => {
        setAppliedFilters({
            brands: selectedBrands,
            os: selectedOS,
            ram: selectedRAM,
            storage: selectedStorage,
            battery: selectedBattery,
            camera: selectedCamera,
        });
    };

    // Filtering logic
    const filteredProducts = products.filter((product) => {
        let match = true;

        // Apply search filter
        if (
            appliedSearch &&
            !product.name.toLowerCase().includes(appliedSearch.toLowerCase())
        ) {
            match = false;
        }

        // Filter by Brand
        if (
            appliedFilters.brands.length > 0 &&
            !appliedFilters.brands.includes(product.brand)
        ) {
            match = false;
        }

        // Filter by Operating System
        if (
            appliedFilters.os.length > 0 &&
            !appliedFilters.os.includes(product.specifications.os)
        ) {
            match = false;
        }

        // Filter by RAM (string comparison e.g., "4GB")
        if (appliedFilters.ram.length > 0) {
            const ramStr = product.specifications.ram + "GB";
            if (!appliedFilters.ram.includes(ramStr)) {
                match = false;
            }
        }

        // Filter by Storage (string comparison e.g., "128GB")
        if (appliedFilters.storage.length > 0) {
            const storageStr = product.specifications.storage + "GB";
            if (!appliedFilters.storage.includes(storageStr)) {
                match = false;
            }
        }

        // Filter by Battery (using numeric ranges)
        if (appliedFilters.battery.length > 0) {
            const battery = product.specifications.battery;
            let batteryMatch = false;
            for (let range of appliedFilters.battery) {
                if (range === "2000-3000" && battery >= 2000 && battery <= 3000) {
                    batteryMatch = true;
                } else if (range === "3000-4000" && battery > 3000 && battery <= 4000) {
                    batteryMatch = true;
                } else if (range === "4000+" && battery > 4000) {
                    batteryMatch = true;
                }
            }
            if (!batteryMatch) {
                match = false;
            }
        }

        // Filter by Camera (string comparison e.g., "12MP")
        if (appliedFilters.camera.length > 0) {
            const cameraStr = product.specifications.camera + "MP";
            if (!appliedFilters.camera.includes(cameraStr)) {
                match = false;
            }
        }

        return match;
    });

    return (
        <div className="home-container">
            <h1 className="page-title">Product Listings</h1>
            <div className="content-area">
                {/* Sidebar Filters */}
                <aside className="sidebar">
                    <h2>Filters</h2>

                    {/* Brand Filter */}
                    <div className="filter-group">
                        <p>Brand:</p>
                        {brandOptions.map((brand) => (
                            <div key={brand} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id={`brand-${brand}`}
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() =>
                                        toggleSelection(brand, selectedBrands, setSelectedBrands)
                                    }
                                />
                                <label htmlFor={`brand-${brand}`}>{brand}</label>
                            </div>
                        ))}
                    </div>

                    {/* Operating System Filter */}
                    <div className="filter-group">
                        <p>Operating System:</p>
                        {osOptions.map((os) => (
                            <div key={os} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id={`os-${os}`}
                                    checked={selectedOS.includes(os)}
                                    onChange={() => toggleSelection(os, selectedOS, setSelectedOS)}
                                />
                                <label htmlFor={`os-${os}`}>{os}</label>
                            </div>
                        ))}
                    </div>

                    {/* RAM Filter */}
                    <div className="filter-group">
                        <p>RAM:</p>
                        {ramOptions.map((ram) => (
                            <div key={ram} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id={`ram-${ram}`}
                                    checked={selectedRAM.includes(ram)}
                                    onChange={() => toggleSelection(ram, selectedRAM, setSelectedRAM)}
                                />
                                <label htmlFor={`ram-${ram}`}>{ram}</label>
                            </div>
                        ))}
                    </div>

                    {/* Storage Filter */}
                    <div className="filter-group">
                        <p>Storage:</p>
                        {storageOptions.map((storage) => (
                            <div key={storage} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id={`storage-${storage}`}
                                    checked={selectedStorage.includes(storage)}
                                    onChange={() =>
                                        toggleSelection(storage, selectedStorage, setSelectedStorage)
                                    }
                                />
                                <label htmlFor={`storage-${storage}`}>{storage}</label>
                            </div>
                        ))}
                    </div>

                    {/* Battery Filter */}
                    <div className="filter-group">
                        <p>Battery:</p>
                        {batteryOptions.map((range) => (
                            <div key={range} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id={`battery-${range}`}
                                    checked={selectedBattery.includes(range)}
                                    onChange={() =>
                                        toggleSelection(range, selectedBattery, setSelectedBattery)
                                    }
                                />
                                <label htmlFor={`battery-${range}`}>{range}</label>
                            </div>
                        ))}
                    </div>

                    {/* Camera Filter */}
                    <div className="filter-group">
                        <p>Camera:</p>
                        {cameraOptions.map((cam) => (
                            <div key={cam} className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id={`camera-${cam}`}
                                    checked={selectedCamera.includes(cam)}
                                    onChange={() =>
                                        toggleSelection(cam, selectedCamera, setSelectedCamera)
                                    }
                                />
                                <label htmlFor={`camera-${cam}`}>{cam}</label>
                            </div>
                        ))}
                    </div>

                    <button className="apply-button" onClick={handleApplyFilters}>
                        Apply Filters
                    </button>
                </aside>

                {/* Main Content Area */}
                <main className="main-content">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            Search
                        </button>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <p>No products match your filters.</p>
                    ) : (
                        <div className="product-grid">
                            {filteredProducts.map((product) => (
                                <>
                                    <Product
                                        key={product._id}
                                        productId={product._id}
                                        imageUrl={product.images[0]}
                                        name={product.name}
                                        brand={product.brand}
                                        price={product.price}
                                        description={product.description}
                                        stock={product.stock}
                                        rating={product.rating}
                                        specifications={product.specifications}
                                    />
                                </>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductsPage;
