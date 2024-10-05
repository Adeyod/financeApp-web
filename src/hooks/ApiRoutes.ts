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
const transactionsRoute = `${host}/transactions/user-transactions`;
const creditAccountRoute = `${host}/transactions/initialize`;
const createAccountRoute = `${host}/accounts/user-account/create`;
// const getTransactionById = `${host}/transactions/`;
const callbackRoute = `${host}/transactions/call-back`;
// const getUserAccounts;

export {
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
};

// Needed to add userId and token to this two routes
