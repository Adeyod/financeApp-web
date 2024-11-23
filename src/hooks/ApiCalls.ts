import axios from 'axios';
import {
  accountsRoute,
  callbackRoute,
  ChangePasswordRoute,
  createAccountRoute,
  creditAccountRoute,
  getBankDetailsRoute,
  getUserSingleAccountTransactionsRoute,
  ImageUploadRoute,
  singleAccountUsingAccountNumberRoute,
  transactionsRoute,
  getUserAccountNameRoute,
  transferToOtherBank,
  transferToFundFlowAccount,
  singleTransactionByTransactionId,
  paystackTransactionResponseRoute,
  ResetPasswordRoute,
  getReceivingFundFlowAccountNameRoute,
  allNotificationsRoute,
  deleteNotificationRoute,
  deleteManyNotificationRoute,
  singleNotificationRoute,
  markNotificationAsViewedRoute,
  markNotificationAsReadRoute,
  allAccountsRoute,
  allTransactionsRoute,
  allCustomersRoute,
  getSingleAccountOfAUserForAdminRoute,
  getSingleCustomerForAdminRoute,
  getSingleTransactionOfAUserForAdminRoute,
  allAdminsRoute,
  getSingleAdminForSuperAdminRoute,
  removeAdminRoute,
} from './ApiRoutes';
import {
  AccountDataType,
  CustomerDataType,
  dataObj,
  DataToSend,
  SingleAccountFetchProp,
  SuccessMessage,
  TransactionDataType,
  TransactionResponse,
  TransferDataType,
} from '../constants/types';

const header = {
  'Content-Type': 'application/json',
  'x-fund-flow': 'web-fund-flow',
};

const getFundFlowReceivingAccountName = async (account_number: string) => {
  try {
    const response = await axios(
      `${getReceivingFundFlowAccountNameRoute}/${account_number}`,

      {
        headers: header,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAccountName = async (receivingAccount: string, bankCode: string) => {
  try {
    console.log(receivingAccount);
    console.log(bankCode);
    const response = await axios.post(
      getUserAccountNameRoute,
      {
        receivingAccount: receivingAccount,
        bankCode: bankCode,
      },
      {
        headers: header,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const makeTransferToOtherBank = async (data: DataToSend) => {
  try {
    const response = await axios.post(
      transferToOtherBank,
      {
        receivingAccount: data.receiving_account,
        bankCode: data.bankCode,
        receiverDetails: data.receiverDetails,
        amount: data.amount,
        selectedAccountNumber: data.selectedAccountNumber,
        narration: data.narration,
      },
      {
        headers: header,
      }
    );

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserAccounts = async () => {
  try {
    const accounts = await axios.get(accountsRoute, {
      headers: header,
    });
    return accounts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPlatformAccounts = async (
  page: string,
  limit: string,
  searchValue: string
): Promise<AccountDataType> => {
  try {
    const accounts = await axios.get<AccountDataType>(
      `${allAccountsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );
    return accounts.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleAccountOfAUserForAdmin = async ({
  user_id,
  account_id,
}: SingleAccountFetchProp) => {
  try {
    const response = await axios(
      `${getSingleAccountOfAUserForAdminRoute}${user_id}/${account_id}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleTransactionOfAUserForAdmin = async (transaction_id: string) => {
  try {
    const response = await axios(
      `${getSingleTransactionOfAUserForAdminRoute}${transaction_id}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleCustomerForAdmin = async (customer_id: string) => {
  try {
    const response = await axios(
      `${getSingleCustomerForAdminRoute}${customer_id}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleAdminForSuperAdmin = async (admin_id: string) => {
  try {
    const response = await axios(
      `${getSingleAdminForSuperAdminRoute}${admin_id}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPlatformTransactions = async (
  page: string,
  limit: string,
  searchValue: string
): Promise<TransactionDataType> => {
  try {
    const transactions = await axios.get<TransactionDataType>(
      `${allTransactionsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );
    return transactions.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPlatformCustomers = async (
  page: string,
  limit: string,
  searchValue: string
): Promise<CustomerDataType> => {
  try {
    const customers = await axios.get<CustomerDataType>(
      `${allCustomersRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );
    return customers.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getPlatformAdmins = async (
  page: string,
  limit: string,
  searchValue: string
): Promise<CustomerDataType> => {
  try {
    const admins = await axios.get<CustomerDataType>(
      `${allAdminsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );
    return admins.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const reduceAdminToCustomer = async (
  admin_id: string
): Promise<CustomerDataType> => {
  try {
    const admins = await axios.put<CustomerDataType>(
      `${removeAdminRoute}${admin_id}`,
      {},
      {
        headers: header,
      }
    );
    return admins.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserTransactions = async (
  page: string,
  limit: string,
  searchValue: string
): Promise<TransactionDataType> => {
  try {
    console.log(page);
    console.log(limit);
    console.log(searchValue);
    const transactions = await axios.get<TransactionDataType>(
      `${transactionsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );
    return transactions.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const imageProfileUpload = async (formData: object) => {
  try {
    const result = axios.post(ImageUploadRoute, formData, {
      headers: {
        ...header,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleTransactionByTransactionId = async (transaction_id: string) => {
  try {
    const transaction = await axios(
      `${singleTransactionByTransactionId}/${transaction_id}`,
      {
        headers: header,
      }
    );
    console.log(transaction.data);
    return transaction.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const creditUserAccount = async (account_number: string, amount: string) => {
  try {
    const response = await axios.post(
      creditAccountRoute,
      {
        account_number,
        amount,
      },
      {
        headers: header,
      }
    );
    console.log('ApiCall credit:', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserSingleAccountTransactionsWithoutQuery = async (
  account_number: string
): Promise<TransactionResponse> => {
  try {
    // console.log(page);

    const response = await axios(
      `${getUserSingleAccountTransactionsRoute}${account_number}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserSingleAccountTransactions = async (
  account_number: string,
  page: string,
  limit: string,
  searchValue: string
): Promise<TransactionResponse> => {
  try {
    // console.log(page);
    console.log(searchValue);
    const response = await axios(
      `${getUserSingleAccountTransactionsRoute}${account_number}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserSingleAccountDetailsByAccountNumber = async (
  account_number: string
): Promise<TransactionResponse> => {
  try {
    const response = await axios(
      `${singleAccountUsingAccountNumberRoute}/${account_number}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchBankDetails = async () => {
  try {
    const response = await axios(getBankDetailsRoute, {
      headers: header,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createNewAccountNumber = async () => {
  try {
    console.log('creating account number');
    const response = await axios.post(
      createAccountRoute,
      {},
      {
        headers: header,
      }
    );
    console.log('ApiCall create account:', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changeUserPassword = async (
  current_password: string,
  new_password: string,
  confirm_new_password: string
): Promise<SuccessMessage> => {
  try {
    const response = await axios.post<SuccessMessage>(
      ChangePasswordRoute,
      {
        current_password,
        new_password,
        confirm_new_password,
      },
      {
        headers: header,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const callbackResult = async (reference: string) => {
  console.log(reference);
  try {
    const response = await axios(`${callbackRoute}?reference=${reference}`, {
      headers: header,
    });
    console.log('response: ', response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const makeTransferToFundFlowAccount = async ({
  receiving_account_number,
  amount,
  selected_account_number,
  description,
  receiver_account_name,
}: TransferDataType) => {
  try {
    console.log(receiver_account_name);
    const dataObj = {
      receiving_account_number,
      amount,
      selected_account_number,
      description,
      receiver_account_name,
    };
    const response = await axios.post(transferToFundFlowAccount, dataObj, {
      headers: header,
    });

    console.log(response);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getTransactionResponse = async (reference: string) => {
  try {
    const response = await axios(
      `${paystackTransactionResponseRoute}/${reference}`
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const resetPasswordProcess = async (dataObj: dataObj) => {
  console.log('DATA OBJECT: ', dataObj);
  const { token, userId, ...rest } = dataObj;

  try {
    const response = await axios.post(
      `${ResetPasswordRoute}?userId=${userId}&token=${token}`,
      rest,
      {
        headers: header,
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNotifications = async (
  page: string,
  limit: string,
  searchValue: string
) => {
  try {
    const response = await axios(
      `${allNotificationsRoute}?searchParams=${searchValue}&page=${page}&limit=${limit}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const markNotificationsAsViewed = async () => {
  try {
    const response = await axios.put(
      markNotificationAsViewedRoute,
      {},
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const markANotificationAsRead = async (notification_id: string) => {
  console.log(notification_id);
  try {
    const response = await axios.put(
      `${markNotificationAsReadRoute}${notification_id}`,
      {},
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleNotification = async (notification_id: string) => {
  try {
    const response = await axios(
      `${singleNotificationRoute}/${notification_id}`,
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteNotification = async (notification_id: number) => {
  try {
    const id = notification_id.toString();
    const response = await axios.delete(`${deleteNotificationRoute}/${id}`, {
      headers: header,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteManyNotifications = async (notification_ids: number[]) => {
  try {
    console.log('deleteManyNotifications:', notification_ids);
    const response = await axios.post(
      deleteManyNotificationRoute,
      {
        notification_ids,
      },
      {
        headers: header,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  reduceAdminToCustomer,
  deleteManyNotifications,
  getSingleAdminForSuperAdmin,
  getPlatformAdmins,
  getSingleTransactionOfAUserForAdmin,
  getSingleCustomerForAdmin,
  getSingleAccountOfAUserForAdmin,
  getPlatformAccounts,
  getPlatformTransactions,
  getPlatformCustomers,
  markANotificationAsRead,
  markNotificationsAsViewed,
  getNotifications,
  getSingleNotification,
  deleteNotification,
  getFundFlowReceivingAccountName,
  resetPasswordProcess,
  makeTransferToFundFlowAccount,
  getUserSingleAccountTransactionsWithoutQuery,
  makeTransferToOtherBank,
  getAccountName,
  getUserSingleAccountDetailsByAccountNumber,
  getUserSingleAccountTransactions,
  callbackResult,
  createNewAccountNumber,
  creditUserAccount,
  changeUserPassword,
  getUserAccounts,
  getUserTransactions,
  getSingleTransactionByTransactionId,
  imageProfileUpload,
  fetchBankDetails,
  getTransactionResponse,
};
