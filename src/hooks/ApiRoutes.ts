const host = 'http://localhost:3020/api';

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
// const getTransactionById = `${host}/transactions/`;
const callbackRoute = `${host}/transactions/call-back`;
const allNotificationsRoute = `${host}/notifications/user-notifications`;
const singleNotificationRoute = `${host}/notifications/user-notifications`;
const deleteNotificationRoute = `${host}/notifications/user-notifications`;
// const getUserAccounts;

export {
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
};

// Needed to add userId and token to this two routes
