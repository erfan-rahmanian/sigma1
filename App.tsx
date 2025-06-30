
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewPurchase from './pages/NewPurchase';
import PurchasesList from './pages/PurchasesList';
import AccountStatement from './pages/AccountStatement';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { getToken, clearToken, logout } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      // Still log out on client side even if API call fails
    } finally {
      clearToken();
      setIsLoggedIn(false);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-purchase" element={<NewPurchase />} />
        <Route path="/purchases-list" element={<PurchasesList />} />
        <Route path="/account-statement" element={<AccountStatement />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

export default App;
