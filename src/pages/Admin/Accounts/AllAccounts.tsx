import { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';
import useApi from '../../../hooks/ApiCalls';
import { getAllAccountsSuccess } from '../../../redux/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminState } from '../../../constants/types';
import { formattedNumber } from '../../../hooks/functions';
import { Link } from 'react-router-dom';
import useDebounce from '../../../hooks/UseDebounce';
import Search from '../../../components/Search';

const AllAccounts = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { getPlatformAccounts } = useApi();

  const { allAccounts, allAccountsTotalCount } = useSelector(
    (state: { admin: AdminState }) => state.admin
  );

  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';
  const totalPages = Math.ceil(allAccountsTotalCount / Number(limit));

  const fetchAllAccounts = async (searchValue: string) => {
    try {
      const response = await getPlatformAccounts(
        page.toString(),
        limit,
        searchValue
      );

      if (response.success === true) {
        dispatch(getAllAccountsSuccess(response.accounts));
      } else {
        throw new Error('Unable to fetch all accounts');
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
      fetchAllAccounts(debouncedSearchValue);
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

    fetchAllAccounts(searchValue);
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
                e.key === 'Enter' && fetchAllAccounts(searchValue)
              }
            />
          </div>
          <div className="">
            <p className="text-center uppercase font-bold underline text-xl my-3 bg-gray-100 p-2">
              All Platform Accounts
            </p>
          </div>
          <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
            <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="pr-1 w-1/7  md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="w-1/7 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Balance(#)
                  </th>

                  <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    User ID
                  </th>

                  <th className="w-1/7 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Details
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
                ) : allAccounts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      There are no accounts yet 😑
                    </td>
                  </tr>
                ) : (
                  allAccounts.map((account, index) => (
                    <tr key={index} className="">
                      <td className="md:px-6 py-4 flex gap-2 whitespace-nowrap text-sm text-gray-500">
                        {account?.account_number}

                        {account?.is_default === true && (
                          <p className="uppercase">(pry)</p>
                        )}
                      </td>

                      <td className="md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formattedNumber(Number(account?.balance))}
                      </td>

                      <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                        {`${account?.user_id.slice(
                          0,
                          5
                        )} ... ${account?.user_id.slice(30, 36)}`}
                      </td>

                      <td className="md:px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                        <Link
                          to={`/admin/account/${account?.user_id}/${account?.id}`}
                        >
                          view details
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

export default AllAccounts;
