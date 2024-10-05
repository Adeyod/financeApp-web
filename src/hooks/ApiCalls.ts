import axios from 'axios';
import {
  accountsRoute,
  callbackRoute,
  ChangePasswordRoute,
  createAccountRoute,
  creditAccountRoute,
  transactionsRoute,
} from './ApiRoutes';
import { SuccessMessage, TransactionDataType } from '../constants/types';

const getUserAccounts = async () => {
  try {
    const accounts = await axios.get(accountsRoute);
    return accounts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserTransactions = async (
  page: string,
  limit: string
): Promise<TransactionDataType> => {
  try {
    const transactions = await axios.get<TransactionDataType>(
      `${transactionsRoute}?page=${page}&limit=${limit}`
    );
    return transactions.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleTransactionByTransactionId = async () => {
  try {
    const transactions = await axios.get(transactionsRoute);
    return transactions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const creditUserAccount = async (account_number: string, amount: string) => {
  try {
    const response = await axios.post(creditAccountRoute, {
      account_number,
      amount,
    });
    console.log('ApiCall credit:', response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createNewAccountNumber = async () => {
  try {
    const response = await axios.post(createAccountRoute);
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
    const response = await axios.post<SuccessMessage>(ChangePasswordRoute, {
      current_password,
      new_password,
      confirm_new_password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const callbackResult = async (reference: string) => {
  try {
    const response = await axios(`${callbackRoute}?${reference}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  callbackResult,
  createNewAccountNumber,
  creditUserAccount,
  changeUserPassword,
  getUserAccounts,
  getUserTransactions,
  getSingleTransactionByTransactionId,
};
