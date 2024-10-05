import { useDispatch, useSelector } from 'react-redux';
import { TransactionType, UserState } from '../constants/types';
import { capitalizeFirstLetter, formatDate } from '../hooks/functions';
import TransactionSummary from '../components/Transactions/TransactionSummary';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTransactionsSuccess } from '../redux/userSlice';
import { getUserTransactions } from '../hooks/ApiCalls';
import { toast } from 'react-toastify';

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [localTransactionDetails, setLocalTransactionDetails] = useState<
    TransactionType[]
  >([]);
  const { currentUser, totalTransactionsCount } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  const getAllTransactions = async () => {
    console.log(localTransactionDetails);
    try {
      setLoading(true);
      const response = await getUserTransactions(page, limit);

      console.log(response);

      if (response) {
        toast.success(response?.message);
        dispatch(getTransactionsSuccess(response?.transactions));

        setLocalTransactionDetails(response?.transactions?.transactions);
        console.log(response?.transactions?.transactions);
        return;
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div>
      <div className=""></div>
      <div className="mt-10 ml-5 mb-3">
        <p className="text-xl">
          Hello, {capitalizeFirstLetter(currentUser?.first_name)} you are
          welcome back
        </p>
      </div>

      <TransactionSummary
        transactions={localTransactionDetails}
        totalCounts={totalTransactionsCount}
      />

      <div className="overflow-auto w-[100%]">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200 h-16 py-10">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Account number
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Amount
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Transaction date
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Transaction type
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Transaction status
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Description
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr className="pt-[-400px]">
                  <td colSpan={7} className="text-center pt-[-400px]">
                    <Spinner />
                  </td>
                </tr>
              ) : localTransactionDetails?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center">
                      <img src={'../../public/diamond1.jfif'} alt="" />
                      <p className="text-[#AB2638] font-extrabold text-[16px] ">
                        You have no transactions yet 😑
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {localTransactionDetails?.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction?.account_number}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction?.amount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(new Date(transaction?.transaction_date))}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction?.transaction_type}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction?.transaction_status}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction?.description}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                        <Link to={`/transaction/${transaction?.id}`}>
                          view details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
