import { useDispatch, useSelector } from 'react-redux';
import CreditOptions from '../components/CreditOptions';
import { AccountState, TransactionState } from '../constants/types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getUserSingleAccountDetailsByAccountNumber,
  getUserSingleAccountTransactionsWithoutQuery,
} from '../hooks/ApiCalls';
import { getSingleAccountSuccess } from '../redux/accountSlice';
import { getSingleAccountTransactionsSuccess } from '../redux/transactionSlice';
import OtherBanks from '../components/Transfers/OtherBanks';
import FundFlow from '../components/Transfers/FundFlow';
import axios from 'axios';
import SmallSpinner from '../components/SmallSpinner';

const TransferPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedAccountNumber, setSelectedAccountNumber] =
    useState<string>('');
  const [fundFlow, setFundFlow] = useState(false);
  const [otherBanks, setOtherBanks] = useState(false);

  const {
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transactions: TransactionState }) => state.transactions
  );

  const { accountDetails, singleAccountDetails } = useSelector(
    (state: { accounts: AccountState }) => state.accounts
  );

  const getAccountDetails = async () => {
    try {
      if (!selectedAccountNumber) {
        return;
      }

      const response = await getUserSingleAccountDetailsByAccountNumber(
        selectedAccountNumber
      );

      if (response) {
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

  const getAllTransactions = async () => {
    try {
      setLoading(true);

      if (!selectedAccountNumber) {
        return;
      }
      const response = await getUserSingleAccountTransactionsWithoutQuery(
        selectedAccountNumber
      );

      if (response) {
        dispatch(getSingleAccountTransactionsSuccess(response));

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

  useEffect(() => {
    getAccountDetails();
    getAllTransactions();
  }, [selectedAccountNumber]);

  return (
    <div className="mt-6">
      <div className="mx-10 mt-16 ml-1 md:mx-5">
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
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="lg:w-[30vw] md:w-[40vw] w-[50vw] justify-center items-center flex flex-col">
          <select
            name="account_number"
            id="account_number"
            className="border px-4 py-2 rounded-md w-[70%]"
            value={selectedAccountNumber}
            onChange={handleAccountChange}
          >
            <option value="" disabled className="">
              Choose account to debit
            </option>
            {accountDetails.accounts.map((account, index) => (
              <option value={account.account_number} key={index} className="">
                {account.account_number}
              </option>
            ))}
          </select>
          <div className="mt-3">{loading && <SmallSpinner />}</div>
        </div>

        <div className="mt-3 flex gap-3">
          <button
            onClick={() => {
              setFundFlow(true);
              setOtherBanks(false);
            }}
            className="bg-primary text-white p-2 font-bold italic rounded-lg"
          >
            FundFlow
          </button>
          <button
            onClick={() => {
              setFundFlow(false);
              setOtherBanks(true);
            }}
            className="bg-primary text-white p-2 font-bold italic rounded-lg"
          >
            Other Banks
          </button>
        </div>

        <div className="mb-32">
          {fundFlow ? (
            <div className="">
              <FundFlow selectedAccountNumber={selectedAccountNumber} />
            </div>
          ) : otherBanks ? (
            <div className="">
              <OtherBanks selectedAccountNumber={selectedAccountNumber} />
            </div>
          ) : (
            <div className="">Please select bank</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferPage;
