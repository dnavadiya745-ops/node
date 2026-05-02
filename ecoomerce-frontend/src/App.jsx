import React from "react";
import { Routes, Route } from "react-router-dom";

// User Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import JoinUs from "./Pages/JoinUs";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import CheckoutPage from "./Pages/CheckoutPage";
import OrdersPage from "./Pages/OrdersPage";

// Admin Pages
import Dashboard from "./Admin/pages/Dashboard";
import User from "./Admin/pages/User";
import Product from "./Admin/pages/Product";
import AddProduct from "./Admin/pages/AddProduct";

// Admin Route
import AdminRoutes from "./Admin/Routes/AdminRoutes";
import AdminOrders from "./Admin/pages/AdminOrders";

const App = () => {
  return (
    <Routes>

      {/* User */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/joinus" element={<JoinUs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminRoutes><Dashboard /></AdminRoutes>} />
      <Route path="/admin/users" element={<AdminRoutes><User /></AdminRoutes>} />
      <Route path="/admin/products" element={<AdminRoutes><Product /></AdminRoutes>} />
      <Route path="/admin/add-product" element={<AdminRoutes><AddProduct /></AdminRoutes>} />
      <Route path="/admin/orders" element={<AdminRoutes><AdminOrders /></AdminRoutes>} />

    </Routes>
  );
};

export default App;