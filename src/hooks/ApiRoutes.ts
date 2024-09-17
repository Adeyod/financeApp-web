const host = 'http://localhost:3020/api';

const RegisterRoute = `${host}/auth/register`;
const logoutRoute = `${host}/auth/logout`;
const LoginRoute = `${host}/auth/login`;
const ForgotPasswordRoute = `${host}/auth/forgot-password`;
const ResetPasswordRoute = `${host}/auth/reset-password`;
const EmailVerificationRoute = `${host}/auth/email-verification`;
const ResentEmailVerificationRoute = `${host}/auth/resend-email-verification`;
const accountsRoute = `${host}/accounts/user-accounts`;
const transactionsRoute = `${host}/transactions/user-transactions`;

export {
  accountsRoute,
  transactionsRoute,
  logoutRoute,
  RegisterRoute,
  LoginRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  EmailVerificationRoute,
  ResentEmailVerificationRoute,
};

// Needed to add userId and token to this two routes
