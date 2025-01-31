import { Routes, Route } from "react-router-dom";
import "./App.css";

// Public Pages
import Home from "./pages/public_routes/HomePage";
import Register from "./pages/public_routes/SignUpPage";
import Login from "./pages/public_routes/LoginPage";
import ProductPage from "./pages/public_routes/ProductsPage";
import ProductDetails from "./pages/public_routes/ProductDetails";

// Buyer Pages
import Cart from "./pages/buyer/Cart";
import Checkout from "./pages/buyer/Checkout";
import Payment from "./pages/buyer/Payment";
import Orders from "./pages/buyer/Orders";
import Wishlist from "./pages/buyer/Wishlist";
import Profile from "./pages/buyer/Profile";

// Seller Pages
import AddProductForm from "./pages/seller/AddProductForm";
import SellerProducts from "./pages/seller/SellerProducts";
import UpdateProduct from "./pages/seller/UpdateProduct";
import SellerOrders from "./pages/seller/SellerOrders";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <h1>😀😁😂How are you doing🤣😃😄</h1>
      {/* Main Content Area */}
      <div className="main-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Buyer Routes (Protected) */}
          <Route element={<ProtectedRoute role="buyer" />}>
            <Route path="/buyer">
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="payment" element={<Payment />} />
              <Route path="orders" element={<Orders />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Seller Routes (Protected) */}
          <Route element={<ProtectedRoute role="seller" />}>
            <Route path="/seller">
              <Route path="add-product" element={<AddProductForm />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="update-product/:productId" element={<UpdateProduct />} />
              <Route path="orders" element={<SellerOrders />} />
            </Route>
          </Route>

          {/* Admin Routes (Protected) */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin">
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
