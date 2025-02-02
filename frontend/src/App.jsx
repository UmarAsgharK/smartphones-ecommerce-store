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
import GuestRoute from "./components/GuestRoute"; // Import GuestRoute
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <Navbar />
      <h1>😀😁😂How are you doing🤣😃😄</h1>
      <div className="main-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetails />} />

          {/* Wrap public pages that should not be accessible once logged in */}
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />

          {/* Note: You already have a public route for "add-product" and "payment". 
              If these pages should be protected, you might consider moving them under the proper role routes. */}

          {/* Buyer Routes (Protected) */}
          <Route element={<ProtectedRoute allowedRoles={["buyer"]} />}>
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
          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route path="/seller">
              <Route path="add-product" element={<AddProductForm />} />
              <Route path="products" element={<SellerProducts />} />
              <Route path="update-product/:productId" element={<UpdateProduct />} />
              <Route path="orders" element={<SellerOrders />} />
            </Route>
          </Route>

          {/* Admin Routes (Protected) */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
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
