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
} from './ApiRoutes';
import {
  ReceiverInfo,
  SuccessMessage,
  TransactionDataType,
  TransactionResponse,
} from '../constants/types';

const header = {
  'Content-Type': 'application/json',
  'x-fund-flow': 'web-fund-flow',
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

type DataToSend = {
  narration: string;
  bankCode: string;
  receiving_account: string;
  selectedAccountNumber: string;
  amount: string;
  receiverDetails: ReceiverInfo;
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

// const getAccountDetailsAndTransactions = async (account_id: string) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

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
      headers: header,
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
    const response = await axios.post(createAccountRoute, {
      headers: header,
    });
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

type TransferDataType = {
  receiving_account_number: string;
  amount: string;
  selected_account_number: string;
  description: string;
};

const makeTransferToFundFlowAccount = async ({
  receiving_account_number,
  amount,
  selected_account_number,
  description,
}: TransferDataType) => {
  try {
    const dataObj = {
      receiving_account_number,
      amount,
      selected_account_number,
      description,
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

export {
  makeTransferToFundFlowAccount,
  getUserSingleAccountTransactionsWithoutQuery,
  // getAccountDetailsAndTransactions,
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
};
