import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AdminState } from '../../../constants/types';
import { getAllTransactionsSuccess } from '../../../redux/adminSlice';
import useApi from '../../../hooks/ApiCalls';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { formatDate, formattedNumber } from '../../../hooks/functions';
import useDebounce from '../../../hooks/UseDebounce';
import Search from '../../../components/Search';

const AllTransactions = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { getPlatformTransactions } = useApi();

  const { allTransactions, allTransactionsTotalCount } = useSelector(
    (state: { admin: AdminState }) => state.admin
  );

  console.log('allTransactions', allTransactions);
  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';
  const totalPages = Math.ceil(allTransactionsTotalCount / Number(limit));

  const fetchAllTransactions = async (searchValue: string) => {
    try {
      const response = await getPlatformTransactions(
        page.toString(),
        limit,
        searchValue
      );

      if (response.success === true) {
        dispatch(getAllTransactionsSuccess(response.transactions));
      } else {
        throw new Error('Unable to fetch all transactions');
      }
    } catch (error: unknown) {
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
      fetchAllTransactions(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('limit', limit.toString());
    console.log('I am running');

    if (searchValue) {
      queryParams.set('search', searchValue);
    }

    console.log('Updated URL Params:', queryParams.toString());

    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${queryParams.toString()}`
    );

    fetchAllTransactions(searchValue);
  }, [page, location.pathname, limit, searchValue]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mt-20 mb-10">
            <Search
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              handleKeyPress={(e) =>
                e.key === 'Enter' && fetchAllTransactions(searchValue)
              }
              // handleKeyPress={(e) => handleKeyPress(e)}
            />
          </div>
          <div className="">
            <p className="text-center uppercase font-bold underline text-xl my-3 bg-gray-100 p-2">
              All Platform Transactions
            </p>
          </div>
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
                  <th className="hidden text-start mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                    Transaction date
                  </th>
                  <th className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    Transaction type
                  </th>
                  <th className="hidden text-start lg:table-cell pl-2 md:pl-6 py-2 md:py-3 lg:text-left text-sm md:text-[13px] lg:text-base">
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
                ) : allTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      You have no transactions yet 😑
                    </td>
                  </tr>
                ) : (
                  allTransactions.map((transaction, index) => (
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
                        <Link to={`/admin/transaction/${transaction?.id}`}>
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
      )}
    </>
  );
};

export default AllTransactions;
