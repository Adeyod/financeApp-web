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
import AccountDetailsPage from './pages/AccountDetailsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotificationDetails from './pages/NotificationDetails';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AllAccounts from './pages/Admin/Accounts/AllAccounts';
import AllCustomers from './pages/Admin/Customers/AllCustomers';
import AllTransactions from './pages/Admin/Transactions/AllTransactions';
import SingleAccountDetails from './pages/Admin/Accounts/SingleAccountDetails';
import SingleCustomerDetails from './pages/Admin/Customers/SingleCustomerDetails';
import SingleTransactionDetails from './pages/Admin/Transactions/SingleTransactionDetails';
import AllAdmins from './pages/SuperAdmin/Admins/AllAdmins';
import SingleAdminDetails from './pages/SuperAdmin/Admins/SingleAdminDetails';
import { useSelector } from 'react-redux';
import { UserState } from './constants/types';

function App() {
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  return (
    <>
      <NavBar />
      <div className="flex h-screen ">
        {currentUser && <Sidebar />}

        <div className="flex-grow overflow-y-auto">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedRoutes />}>
              {/* SUPER ADMIN ROUTES */}
              <Route path="/super-admin/admins/all" element={<AllAdmins />} />
              <Route
                path="/super-admin/admin/:adminId"
                element={<SingleAdminDetails />}
              />

              {/* ADMIN ROUTES */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/accounts/all" element={<AllAccounts />} />
              <Route
                path="/admin/account/:userId/:accountId"
                element={<SingleAccountDetails />}
              />
              <Route path="/admin/customers/all" element={<AllCustomers />} />
              <Route
                path="/admin/customer/:customerId"
                element={<SingleCustomerDetails />}
              />
              <Route
                path="/admin/transactions/all"
                element={<AllTransactions />}
              />

              <Route
                path="/admin/transaction/:transactionId"
                element={<SingleTransactionDetails />}
              />

              {/* GENERAL ROUTES */}
              <Route path="/call-back" element={<PaystackCallback />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route
                path="/transaction/:transactionId"
                element={<TransactionDetails />}
              />
              <Route path="/credit" element={<CreditAccountPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route
                path="/notification/:notificationId"
                element={<NotificationDetails />}
              />
              <Route path="/accounts" element={<MyAccountsPage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route
                path="/account/:account_id"
                element={<AccountDetailsPage />}
              />
            </Route>

            <Route path="/" element={<HomePage />} />
            <Route path="/email-verification" element={<EmailVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
