import React, { useState } from "react";
import Product from "../../components/Product";
import "./ProductsPage.css";

// Sample phone products (following your model structure)
const sampleProducts = [
    {
        id: 1,
        name: "iPhone SE",
        brand: "Apple",
        price: 399,
        description: "A compact and affordable iPhone with a powerful chip.",
        stock: 5,
        rating: 3.9,
        specifications: {
            screenSize: 4.7,
            ram: 3,
            storage: 64,
            camera: 12,
            battery: 1821,
            processor: "A13 Bionic",
            os: "iOS",
            networkSupport: ["4G", "WiFi"],
        },
        images: [
            "https://res.cloudinary.com/dfk54d5bj/image/upload/v1738654402/phone_images/vqy0zy3eb6qvy2weziwt.jpg",
        ],
    },
    {
        id: 2,
        name: "iPhone 13",
        brand: "Apple",
        price: 999,
        description: "The latest Apple iPhone with advanced features.",
        stock: 10,
        rating: 4.2,
        specifications: {
            screenSize: 6.1,
            ram: 4,
            storage: 128,
            camera: 12,
            battery: 3227,
            processor: "A15 Bionic",
            os: "iOS",
            networkSupport: ["4G", "5G", "WiFi"],
        },
        images: [
            "https://res.cloudinary.com/dfk54d5bj/image/upload/v1738654390/phone_images/tkucatvpmmaprpqjqtdu.jpg",
        ],
    },
    {
        id: 3,
        name: "Google Pixel 6",
        brand: "Google",
        price: 699,
        description: "Google’s flagship with a clean Android experience.",
        stock: 8,
        rating: 3.8,
        specifications: {
            screenSize: 6.4,
            ram: 8,
            storage: 128,
            camera: 50,
            battery: 4614,
            processor: "Google Tensor",
            os: "Android",
            networkSupport: ["4G", "5G", "WiFi"],
        },
        images: [
            "https://res.cloudinary.com/dfk54d5bj/image/upload/v1738654396/phone_images/dhsvhyqyfvnwxiupjqgu.jpg",
        ],
    },
    {
        id: 4,
        name: "OnePlus 9",
        brand: "OnePlus",
        price: 729,
        description: "Experience speed and smooth performance with OnePlus.",
        stock: 20,
        rating: 4.1,
        specifications: {
            screenSize: 6.55,
            ram: 8,
            storage: 128,
            camera: 48,
            battery: 4500,
            processor: "Snapdragon 888",
            os: "Android",
            networkSupport: ["4G", "5G", "WiFi"],
        },
        images: [
            "https://res.cloudinary.com/dfk54d5bj/image/upload/v1738654400/phone_images/wq1l2ikpaqrjv7vacsdz.jpg",
        ],
    },
];

// Filter options (adjust these lists as needed)
// Replace your existing brandOptions definition with this:
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
    "Other"
];

const osOptions = ["Android", "iOS", "Windows"];
const ramOptions = ["3GB", "4GB", "6GB", "8GB"];
const storageOptions = ["64GB", "128GB", "256GB"];
const batteryOptions = ["2000-3000", "3000-4000", "4000+"];
const cameraOptions = ["12MP", "48MP", "50MP", "64MP"];

const ProductsPage = () => {
    // Search state (separate from filter sidebar)
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");

    // Sidebar filter states
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedOS, setSelectedOS] = useState([]);
    const [selectedRAM, setSelectedRAM] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState([]);
    const [selectedBattery, setSelectedBattery] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState([]);

    // Applied sidebar filters (applied on button click)
    const [appliedFilters, setAppliedFilters] = useState({
        brands: [],
        os: [],
        ram: [],
        storage: [],
        battery: [],
        camera: [],
    });

    // --- Handlers for Search ---
    const handleSearch = () => {
        setAppliedSearch(searchTerm);
    };

    // --- Handlers for Sidebar Filters ---
    const toggleSelection = (option, selectedArray, setSelected) => {
        if (selectedArray.includes(option)) {
            setSelected(selectedArray.filter((o) => o !== option));
        } else {
            setSelected([...selectedArray, option]);
        }
    };

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

    // --- Filtering Logic ---
    const filteredProducts = sampleProducts.filter((product) => {
        let match = true;
        // Check search term (if applied)
        if (appliedSearch && !product.name.toLowerCase().includes(appliedSearch.toLowerCase())) {
            match = false;
        }
        // Check Brand
        if (appliedFilters.brands.length > 0 && !appliedFilters.brands.includes(product.brand)) {
            match = false;
        }
        // Check Operating System
        if (
            appliedFilters.os.length > 0 &&
            !appliedFilters.os.includes(product.specifications.os)
        ) {
            match = false;
        }
        // Check RAM (compare string, e.g., "4GB")
        if (appliedFilters.ram.length > 0) {
            const ramStr = product.specifications.ram + "GB";
            if (!appliedFilters.ram.includes(ramStr)) {
                match = false;
            }
        }
        // Check Storage (compare string, e.g., "128GB")
        if (appliedFilters.storage.length > 0) {
            const storageStr = product.specifications.storage + "GB";
            if (!appliedFilters.storage.includes(storageStr)) {
                match = false;
            }
        }
        // Check Battery (using ranges)
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
        // Check Camera (compare string, e.g., "12MP")
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

            <h1 style={{ color: "white" }}>Product Listings</h1>

            <div className="content-area">
                {/* Sidebar with Filters */}
                <aside className="sidebar">
                    <h2>Filters</h2>

                    {/* Brand Filter */}
                    <div hidden className="filter-group">
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
                                <label htmlFor={`os-${os}`}>{os}</label>
                                <input
                                    type="checkbox"
                                    id={`os-${os}`}
                                    checked={selectedOS.includes(os)}
                                    onChange={() => toggleSelection(os, selectedOS, setSelectedOS)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* RAM Filter */}
                    <div className="filter-group">
                        <p>RAM:</p>
                        {ramOptions.map((ram) => (
                            <div key={ram} className="checkbox-group">
                                <label htmlFor={`ram-${ram}`}>{ram}</label>
                                <input
                                    type="checkbox"
                                    id={`ram-${ram}`}
                                    checked={selectedRAM.includes(ram)}
                                    onChange={() => toggleSelection(ram, selectedRAM, setSelectedRAM)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Storage Filter */}
                    <div className="filter-group">
                        <p>Storage:</p>
                        {storageOptions.map((storage) => (
                            <div key={storage} className="checkbox-group">
                                <label htmlFor={`storage-${storage}`}>{storage}</label>
                                <input
                                    type="checkbox"
                                    id={`storage-${storage}`}
                                    checked={selectedStorage.includes(storage)}
                                    onChange={() =>
                                        toggleSelection(storage, selectedStorage, setSelectedStorage)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {/* Battery Filter */}
                    <div className="filter-group">
                        <p>Battery:</p>
                        {batteryOptions.map((range) => (
                            <div key={range} className="checkbox-group">
                                <label htmlFor={`battery-${range}`}>{range}</label>
                                <input
                                    type="checkbox"
                                    id={`battery-${range}`}
                                    checked={selectedBattery.includes(range)}
                                    onChange={() =>
                                        toggleSelection(range, selectedBattery, setSelectedBattery)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {/* Camera Filter */}
                    <div className="filter-group">
                        <p>Camera:</p>
                        {cameraOptions.map((cam) => (
                            <div key={cam} className="checkbox-group">
                                <label htmlFor={`camera-${cam}`}>{cam}</label>
                                <input
                                    type="checkbox"
                                    id={`camera-${cam}`}
                                    checked={selectedCamera.includes(cam)}
                                    onChange={() =>
                                        toggleSelection(cam, selectedCamera, setSelectedCamera)
                                    }
                                />
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
                                <Product
                                    key={product.id}
                                    imageUrl={product.images[0]}
                                    name={product.name}
                                    brand={product.brand}
                                    price={product.price}
                                    description={product.description}
                                    stock={product.stock}
                                    rating={product.rating}
                                    specifications={product.specifications}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductsPage;
