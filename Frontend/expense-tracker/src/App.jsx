import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import DashboardLayout from './components/Layout/DashboardLayout';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* ✅ Nested routes inside DashboardLayout using Outlet */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<Home />} />
            <Route path="income" element={<Income />} />
            <Route path="expense" element={<Expense />} />
          </Route>
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: "",
          style: { fontSize: '13px' }
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
