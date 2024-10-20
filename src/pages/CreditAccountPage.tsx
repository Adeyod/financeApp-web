import React, { useEffect, useState } from 'react';
import CreditOptions from '../components/CreditOptions';
import Form from '../components/Form';
import Button from '../components/Button';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AccountState, TransactionState, UserState } from '../constants/types';
import { capitalizeFirstLetter } from '../hooks/functions';
import {
  creditUserAccount,
  getUserSingleAccountDetailsByAccountNumber,
  getUserSingleAccountTransactionsWithoutQuery,
} from '../hooks/ApiCalls';
import { toast } from 'react-toastify';
import { getSingleAccountTransactionsSuccess } from '../redux/transactionSlice';
import { getSingleAccountSuccess } from '../redux/accountSlice';
import axios from 'axios';

const CreditAccountPage = () => {
  const dispatch = useDispatch();
  const [selectedAccountNumber, setSelectedAccountNumber] =
    useState<string>('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const { accountDetails, singleAccountDetails } = useSelector(
    (state: { accounts: AccountState }) => state.accounts
  );
  console.log(singleAccountDetails);

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const {
    // singleAccountTransactionDetails,
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transactions: TransactionState }) => state.transactions
  );

  const getAllTransactions = async () => {
    try {
      setLoading(true);

      if (!selectedAccountNumber) {
        console.log('account number is not selected');
        return;
      }
      const response = await getUserSingleAccountTransactionsWithoutQuery(
        selectedAccountNumber
      );

      if (response) {
        toast.success(response?.message);
        dispatch(getSingleAccountTransactionsSuccess(response));
        console.log('CREDIT PAGE:', response.transactions);

        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  const getAccountDetails = async () => {
    try {
      if (!selectedAccountNumber) {
        console.log('account number is not selected');
        return;
      }

      const response = await getUserSingleAccountDetailsByAccountNumber(
        selectedAccountNumber
      );

      if (response) {
        toast.success(response?.message);
        console.log(response);
        dispatch(getSingleAccountSuccess(response));
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    }
  };

  useEffect(() => {
    getAllTransactions();
    getAccountDetails();
  }, [selectedAccountNumber]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const account_number = selectedAccountNumber;
    try {
      setLoading(true);
      const result = await creditUserAccount(account_number, amount);
      console.log(result);
      if (result && result?.data?.data?.authorization_url) {
        console.log(result);

        setAmount('');
        setSelectedAccountNumber('');

        window.location.href = result.data?.data?.authorization_url;
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountNumber(e.target.value);
  };

  const handleChange = (text: string) => {
    setAmount(text);
  };
  return (
    <div>
      <div className="mt-10 ml-5 mb-3">
        <p className="text-xl">
          {capitalizeFirstLetter(currentUser?.first_name)}, we promise you
          seamless transactions
        </p>
      </div>
      <CreditOptions
        singleAccountCompletedTransactionsCount={
          singleAccountCompletedTransactionsCount
        }
        singleAccountTotalTransactionsCount={
          singleAccountTotalTransactionsCount
        }
        accountInfo={singleAccountDetails}
        selectedAccountNumber={selectedAccountNumber}
      />
      <div className="flex mt-[70px] lg:justify-around md:gap-[100px] justify-center items-center md:px-10 lg:px-20 py-10">
        <form
          action=""
          className="lg:w-[30vw] md:w-[40vw] w-[50vw] justify-center items-center flex flex-col"
          onSubmit={handleSubmit}
        >
          <div>
            <p className="uppercase text-3xl text-center font-bold underline">
              Credit Account
            </p>

            <select
              name="account_number"
              id="account_number"
              className="border px-4 py-2 rounded-md w-[70%]"
              value={selectedAccountNumber}
              onChange={handleAccountChange}
            >
              <option value="" disabled className="">
                Choose account to credit
              </option>
              {accountDetails.accounts.map((account, index) => (
                <option value={account.account_number} key={index} className="">
                  {account.account_number}
                </option>
              ))}
            </select>

            <div className="w-[70%]">
              <Form
                title={'Amount'}
                type={'text'}
                required={true}
                placeholder={
                  'Enter the amount you want to credit the account...'
                }
                value={amount}
                setValue={handleChange}
              />
            </div>
            <div className="w-[70%]">
              <Button
                title={'Credit Account'}
                loading={loading}
                buttonStyle={RegisterButtonStyle}
                buttonContainerStyle={RegisterButtonContainerStyle}
                buttonTextStyle={RegisterButtonTextStyle}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditAccountPage;
