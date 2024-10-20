// import { Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import NavBar from './components/NavBar';
// import ResetPassword from './pages/ResetPassword';
// import ForgotPassword from './pages/ForgotPassword';
// import EmailVerification from './pages/EmailVerification';
// import RegisterPage from './pages/RegisterPage';
// import LoginPage from './pages/LoginPage';
// import Profile from './pages/Profile';
// import NotFound from './pages/NotFound';
// import ProtectedRoutes from './components/ProtectedRoutes';
// import PublicRoutes from './components/PublicRoutes';
// import Sidebar from './components/Sidebar';
// import ChangePassword from './pages/ChangePassword';
// import TransactionsPage from './pages/TransactionsPage';
// import TransactionDetails from './pages/TransactionDetails';
// import CreditAccountPage from './pages/CreditAccountPage';
// import MyAccountsPage from './pages/MyAccountsPage';
// import TransferPage from './pages/TransferPage';
// import PaystackCallback from './pages/PaystackCallback';
// import AccountDetailsPage from './pages/AccountDetailsPage';
// import { useState } from 'react';

// function App() {
//   const [toggle, setToggle] = useState(false);
//   return (
//     <>
//       <NavBar />

//       <div className="flex-grow">
//         <Routes>
//           {/* PUBLIC ROUTES THAT AUTHENTICATED USERS SHOULD NOT BE ABLE TO ACCESS UNTIL THEY ARE LOGGED OUT */}
//           <Route element={<PublicRoutes />}>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//           </Route>

//           {/* PROTECTED ROUTES THAT NEEDS AUTHENTICATION */}
//           <Route element={<ProtectedRoutes />}>
//             <Route path="/call-back" element={<PaystackCallback />} />
//             <Route
//               path="/profile"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow">
//                     <Profile toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />
//             {/* Other protected routes can be added here */}

//             <Route
//               path="/change-password"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow">
//                     <ChangePassword toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />

//             <Route
//               path="/transactions"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow">
//                     <TransactionsPage toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />

//             <Route
//               path="/transaction/:transactionId"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow">
//                     <TransactionDetails toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />

//             <Route
//               path="/credit"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow">
//                     <CreditAccountPage toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />

//             <Route
//               path="/accounts"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow ">
//                     <MyAccountsPage toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />

//             <Route
//               path="/transfer"
//               element={
//                 <div className="flex h-screen">
//                   {/* <div className="h-screen max-h-screen "> */}
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   {/* </div> */}
//                   <div className="flex-grow">
//                     <TransferPage toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />

//             <Route
//               path="/account/:account_id"
//               element={
//                 <div className="flex h-screen">
//                   <Sidebar toggle={toggle} setToggle={setToggle} />
//                   <div className="flex-grow">
//                     {/* <div className="flex-grow max-w-[80vw] ml-8 md:ml-10 lg:ml-0 content-center"> */}
//                     <AccountDetailsPage toggle={toggle} />
//                   </div>
//                 </div>
//               }
//             />
//           </Route>

//           <Route path="/" element={<HomePage />} />
//           <Route path="/email-verification" element={<EmailVerification />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;

////////////////////////////////////////////////////////////
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
import { useState } from 'react';

function App() {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <NavBar />
      <div className="flex h-screen ">
        <Sidebar toggle={toggle} setToggle={setToggle} />

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
              <Route path="/call-back" element={<PaystackCallback />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route
                path="/transaction/:transactionId"
                element={<TransactionDetails />}
              />
              <Route path="/credit" element={<CreditAccountPage />} />
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
