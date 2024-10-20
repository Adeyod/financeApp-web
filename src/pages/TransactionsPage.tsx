import { useDispatch, useSelector } from 'react-redux';
import {
  TransactionState,
  TransactionType,
  UserState,
} from '../constants/types';
import {
  capitalizeFirstLetter,
  formatDate,
  formattedNumber,
} from '../hooks/functions';
import TransactionSummary from '../components/Transactions/TransactionSummary';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserTransactions } from '../hooks/ApiCalls';
import { toast } from 'react-toastify';
import { getTransactionsSuccess } from '../redux/transactionSlice';
import axios from 'axios';
import Search from '../components/Search';
import useDebounce from '../hooks/UseDebounce';

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [localTransactionDetails, setLocalTransactionDetails] = useState<
    TransactionType[]
  >([]);
  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  const { totalTransactionsCount } = useSelector(
    (state: { transactions: TransactionState }) => state.transactions
  );

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';
  const totalPages = Math.ceil(totalTransactionsCount / Number(limit));

  const getAllTransactions = async (searchValue: string) => {
    try {
      setLoading(true);
      const response = await getUserTransactions(
        page.toString(),
        limit,
        searchValue
      );

      if (response) {
        dispatch(getTransactionsSuccess(response?.transactions));
        setLocalTransactionDetails(response?.transactions?.transactions || []);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    if (debouncedSearchValue || page) {
      getAllTransactions(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('limit', limit.toString());

    if (searchValue) {
      queryParams.set('search', searchValue);
    }

    console.log('Updated URL Params:', queryParams.toString());

    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${queryParams.toString()}`
    );

    getAllTransactions(searchValue);
  }, [page, location.pathname]);

  return (
    <div>
      <div className="mt-10 flex justify-center">
        <Search
          searchValue={searchValue}
          handleKeyPress={(e) =>
            e.key === 'Enter' && getAllTransactions(searchValue)
          }
          setSearchValue={setSearchValue}
        />
      </div>

      <div className="mt-10 mx-8 mb-3">
        <p className="text-xl">
          Hello, {capitalizeFirstLetter(currentUser?.first_name)} you are
          welcome back
        </p>
      </div>

      <TransactionSummary
        transactions={localTransactionDetails}
        totalCounts={totalTransactionsCount}
      />

      <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
        <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                Account number
              </th>
              <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                Amount(#)
              </th>
              <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                Transaction date
              </th>
              <th className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                Transaction type
              </th>
              <th className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                Transaction status
              </th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : localTransactionDetails.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  You have no transactions yet 😑
                </td>
              </tr>
            ) : (
              localTransactionDetails.map((transaction, index) => (
                <tr key={index}>
                  <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    {transaction?.account_number}
                  </td>
                  <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    {formattedNumber(Number(transaction?.amount))}
                  </td>
                  <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    {formatDate(new Date(transaction?.transaction_date))}
                  </td>
                  <td className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    {transaction?.transaction_type}
                  </td>
                  <td className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    {transaction?.transaction_status}
                  </td>
                  <td className="px-2 md:px-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base underline">
                    <Link to={`/transaction/${transaction?.id}`}>
                      View details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-20 flex justify-between items-center w-full px-4 mt-5">
        <div className="flex gap-4">
          {page > 1 && (
            <button
              className="bg-primary p-2 rounded-lg font-bold text-white"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          )}
          {page < totalPages && (
            <button
              className="bg-primary p-2 rounded-lg font-bold text-white"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>
        <div>
          Page {page} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
