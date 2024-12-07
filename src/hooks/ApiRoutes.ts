const host = 'http://localhost:3020/api';
// const host = 'https://financeapp-backend-atuh.onrender.com/api';

const RegisterRoute = `${host}/auth/register`;
const logoutRoute = `${host}/auth/logout`;
const LoginRoute = `${host}/auth/login`;
const ChangePasswordRoute = `${host}/auth/change-password`;
const ImageUploadRoute = `${host}/users/upload-user-image`;
const ForgotPasswordRoute = `${host}/auth/forgot-password`;
const ResetPasswordRoute = `${host}/auth/reset-password`;
const EmailVerificationRoute = `${host}/auth/email-verification`;
const ResentEmailVerificationRoute = `${host}/auth/resend-email-verification`;
const accountsRoute = `${host}/accounts/user-accounts`;
const singleAccountUsingAccountNumberRoute = `${host}/accounts/get-user-account`;
const transactionsRoute = `${host}/transactions/user-transactions`;
const allAccountsRoute = `${host}/accounts/all`;
const getSingleAccountOfAUserForAdminRoute = `${host}/accounts/admin/account/`;
const getSingleCustomerForAdminRoute = `${host}/users/admin/single-customer/`;
const getSingleAdminForSuperAdminRoute = `${host}/users/super-admin/single-admin/`;
const allTransactionsRoute = `${host}/transactions/all`;
const getSingleTransactionOfAUserForAdminRoute = `${host}/transactions/admin/transaction/`;
const allCustomersRoute = `${host}/users/all-customers`;
const allAdminsRoute = `${host}/users/all-admins`;
const removeAdminRoute = `${host}/users/super-admin/remove-admin/`;

const paystackTransactionResponseRoute = `${host}/transactions/status-paystack`;

const singleTransactionByTransactionId = `${host}/transactions/single-transaction`;
const creditAccountRoute = `${host}/transactions/initialize`;
const transferToOtherBank = `${host}/transactions/send-to-other-bank`;
const transferToFundFlowAccount = `${host}/transactions/send-to-fund-flow`;
const getBankDetailsRoute = `${host}/transactions/banks`;
const createAccountRoute = `${host}/accounts/user-account/create`;
const getUserAccountNameRoute = `${host}/accounts/confirm-receiver-account`;
const getReceivingFundFlowAccountNameRoute = `${host}/accounts/get-receiving-user-details`;
const getUserSingleAccountTransactionsRoute = `${host}/transactions/single-account-transactions/`;
const callbackRoute = `${host}/transactions/call-back`;
const allNotificationsRoute = `${host}/notifications/user-notifications`;
const markNotificationAsViewedRoute = `${host}/notifications/user-notifications/view`;
const markNotificationAsReadRoute = `${host}/notifications/user-notifications/read/`;
const singleNotificationRoute = `${host}/notifications/user-notifications`;
const deleteNotificationRoute = `${host}/notifications/user-notifications`;
const deleteManyNotificationRoute = `${host}/notifications/user-notifications/delete-many`;

export {
  removeAdminRoute,
  deleteManyNotificationRoute,
  getSingleAdminForSuperAdminRoute,
  allAdminsRoute,
  getSingleTransactionOfAUserForAdminRoute,
  getSingleCustomerForAdminRoute,
  getSingleAccountOfAUserForAdminRoute,
  markNotificationAsReadRoute,
  markNotificationAsViewedRoute,
  allNotificationsRoute,
  singleNotificationRoute,
  deleteNotificationRoute,
  getReceivingFundFlowAccountNameRoute,
  transferToFundFlowAccount,
  singleTransactionByTransactionId,
  transferToOtherBank,
  getUserAccountNameRoute,
  getBankDetailsRoute,
  singleAccountUsingAccountNumberRoute,
  getUserSingleAccountTransactionsRoute,
  callbackRoute,
  createAccountRoute,
  creditAccountRoute,
  ChangePasswordRoute,
  accountsRoute,
  transactionsRoute,
  logoutRoute,
  RegisterRoute,
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  EmailVerificationRoute,
  ResentEmailVerificationRoute,
  ImageUploadRoute,
  paystackTransactionResponseRoute,
  allAccountsRoute,
  allTransactionsRoute,
  allCustomersRoute,
};
