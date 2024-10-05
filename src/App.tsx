import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
import EmailVerification from './pages/EmailVerification';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoutes from './components/PublicRoutes';
import Sidebar from './components/Sidebar';
import ChangePassword from './pages/ChangePassword';
import TransactionsPage from './pages/TransactionsPage';
import TransactionDetails from './pages/TransactionDetails';
import CreditAccountPage from './pages/CreditAccountPage';
import MyAccountsPage from './pages/MyAccountsPage';
import TransferPage from './pages/TransferPage';
import PaystackCallback from './pages/PaystackCallback';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* PUBLIC ROUTES THAT AUTHENTICATED USERS SHOULD NOT BE ABLE TO ACCESS UNTIL THEY ARE LOGGED OUT */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* PROTECTED ROUTES THAT NEEDS AUTHENTICATION */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/call-back" element={<PaystackCallback />} />
          <Route
            path="/profile"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <Profile />
                </div>
              </div>
            }
          />
          {/* Other protected routes can be added here */}

          <Route
            path="/change-password"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <ChangePassword />
                </div>
              </div>
            }
          />

          <Route
            path="/transactions"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <TransactionsPage />
                </div>
              </div>
            }
          />

          <Route
            path="/transaction/:transactionId"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <TransactionDetails />
                </div>
              </div>
            }
          />

          <Route
            path="/credit"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <CreditAccountPage />
                </div>
              </div>
            }
          />

          <Route
            path="/accounts"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <MyAccountsPage />
                </div>
              </div>
            }
          />

          <Route
            path="/transfer"
            element={
              <div className="flex">
                <Sidebar />
                <div className="flex-grow">
                  <TransferPage />
                </div>
              </div>
            }
          />
        </Route>

        <Route path="/" element={<HomePage />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
