import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import {
  capitalizeFirstLetter,
  formatDate,
  formattedNumber,
} from '../hooks/functions';
import { AccountState, TransactionState, UserState } from '../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getUserSingleAccountTransactions } from '../hooks/ApiCalls';
import { toast } from 'react-toastify';
import { getSingleAccountTransactionsSuccess } from '../redux/transactionSlice';
import CreditOptions from '../components/CreditOptions';
import axios from 'axios';
import Search from '../components/Search';
import useDebounce from '../hooks/UseDebounce';

const AccountDetailsPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const {
    singleAccountTransactionDetails,
    singleAccountCompletedTransactionsCount,
    singleAccountTotalTransactionsCount,
  } = useSelector(
    (state: { transactions: TransactionState }) => state.transactions
  );

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const { accountDetails } = useSelector(
    (state: { accounts: AccountState }) => state.accounts
  );

  const { account_id } = useParams();

  const accountNumber = accountDetails.accounts.filter(
    (account) => account.id === account_id
  );

  // const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';

  console.log(searchValue);

  const totalPages = Math.ceil(
    singleAccountTotalTransactionsCount / Number(limit)
  );

  const handleAccountFetch = async (searchValue: string) => {
    try {
      const response = await getUserSingleAccountTransactions(
        accountNumber[0].account_number,
        page.toString(),
        limit,
        searchValue
      );

      if (response) {
        dispatch(getSingleAccountTransactionsSuccess(response));

        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An Error occurred:', error);
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000); // Use the debounced value with a 500ms delay

  useEffect(() => {
    if (debouncedSearchValue || page) {
      handleAccountFetch(debouncedSearchValue);
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

    // Update URL without reloading
    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${queryParams.toString()}`
    );

    // Fetch transactions when the search value changes
    handleAccountFetch(searchValue);
  }, [page, location.pathname]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="">
          <div className="md:ml-[-100px] mt-5 flex justify-center">
            <Search
              searchValue={searchValue}
              handleKeyPress={(e) =>
                e.key === 'Enter' && handleAccountFetch(searchValue)
              }
              setSearchValue={setSearchValue}
            />
          </div>
          <div className="max-w-[80vw] mx-2 md:ml-10 lg:ml-0 content-center">
            <CreditOptions
              singleAccountCompletedTransactionsCount={
                singleAccountCompletedTransactionsCount
              }
              singleAccountTotalTransactionsCount={
                singleAccountTotalTransactionsCount
              }
              accountInfo={{
                accounts: accountNumber[0],
              }}
              selectedAccountNumber={accountNumber[0].account_number}
            />
            <div className=" mt-10 ml-16 mb-3">
              <p className="text-xl italic font-bold">
                {capitalizeFirstLetter(currentUser?.user_name)}, welcome back
              </p>
            </div>

            <div className="overflow-x-auto w-[100%] md:w-full mx-6 md:mx-auto smn:mx-10">
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
                  ) : singleAccountTransactionDetails.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        You have no transactions yet 😑
                      </td>
                    </tr>
                  ) : (
                    singleAccountTransactionDetails.map(
                      (transaction, index) => (
                        <tr key={index}>
                          <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                            {transaction?.account_number}
                          </td>
                          <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                            {formattedNumber(Number(transaction?.amount))}
                          </td>
                          <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                            {formatDate(
                              new Date(transaction?.transaction_date)
                            )}
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
                      )
                    )
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
        </div>
      )}
    </>
  );
};

export default AccountDetailsPage;
