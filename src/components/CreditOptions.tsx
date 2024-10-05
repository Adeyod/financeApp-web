import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TransactionType, UserState } from '../constants/types';
import Spinner from './Spinner';

const CreditOptions = ({ accountNumber }) => {
  const [accountTransactionStatistics, setAccountTransactionStatistics] =
    useState<TransactionType[]>([]);
  const [accountBalance, setAccountBalance] = useState('');
  const { accountDetails, transactionDetails, totalTransactionsCount } =
    useSelector((state: { user: UserState }) => state.user);

  if (accountNumber === undefined) {
    return <Spinner />;
  }

  const accountTransactions = () => {
    const result = transactionDetails?.filter(
      (transaction) => transaction?.account_number === accountNumber
    );

    setAccountTransactionStatistics(result);
  };

  const acctBalance = () => {
    const result = accountDetails?.accounts?.filter(
      (account) => account?.account_number === accountNumber
    );
    setAccountBalance(result[0]?.balance);
  };

  const totalCompleted = accountTransactionStatistics?.filter(
    (transaction) => transaction?.transaction_status === 'completed'
  )?.length;

  useEffect(() => {
    accountTransactions();
    acctBalance();
  }, [accountNumber]);
  return (
    <div className="q-stat w-full flex justify-evenly items-center">
      <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary ">
        <div className="flex gap-2 justify-center items-center">
          <div className="border-4 border-[#FFF7E7] h-5 w-5 rounded-full  bg-[#FFC453] p-2"></div>

          <div className="flex gap-2 justify-center items-center">
            <div className="text-white font-bold italic">
              Completed transactions
            </div>

            <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
              {totalCompleted}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
        <div className="flex gap-2 justify-center items-center">
          <div className="border-4 border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
          <div className="flex gap-2 justify-center items-center">
            <div className="text-white font-bold italic">
              Total transactions
            </div>
            <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
              {totalTransactionsCount}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
        <div className="flex gap-2 justify-center items-center">
          <div className="border-4 border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
          <div className="flex gap-2 justify-center items-center">
            <div className="text-white font-bold italic">Total Amount</div>
            <div className="text-white font-bold italic text-xl border px-2 rounded-lg items-center justify-center flex">
              {accountBalance ? `#${accountBalance}` : `#0`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOptions;
