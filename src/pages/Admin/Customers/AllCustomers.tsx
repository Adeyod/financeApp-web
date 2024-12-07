import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomersSuccess } from '../../../redux/adminSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import { AdminState } from '../../../constants/types';
import useDebounce from '../../../hooks/UseDebounce';
import Search from '../../../components/Search';
import useApi from '../../../hooks/ApiCalls';

const AllCustomers = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { getPlatformCustomers } = useApi();

  const { allCustomers, allCustomersTotalCount } = useSelector(
    (state: { admin: AdminState }) => state.admin
  );

  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';
  const totalPages = Math.ceil(allCustomersTotalCount / Number(limit));

  const fetchAllCustomers = async (searchValue: string) => {
    try {
      const response = await getPlatformCustomers(
        page.toString(),
        limit,
        searchValue
      );

      if (response.success === true) {
        dispatch(getAllCustomersSuccess(response.customers));
      } else {
        throw new Error('Unable to fetch all customers');
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
      fetchAllCustomers(debouncedSearchValue);
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

    fetchAllCustomers(searchValue);
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
                e.key === 'Enter' && fetchAllCustomers(searchValue)
              }
            />
          </div>
          <div className="">
            <p className="text-center uppercase font-bold underline text-xl my-3 bg-gray-100 p-2">
              All Customers
            </p>
          </div>
          <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
            <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    First name
                  </th>

                  <th className="lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    Last name
                  </th>
                  <th className="lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                    User name
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
                ) : allCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      No Customers yet 😑
                    </td>
                  </tr>
                ) : (
                  allCustomers.map((customer, index) => (
                    <tr key={index}>
                      <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {customer?.first_name}
                      </td>

                      <td className="lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {customer?.last_name}
                      </td>
                      <td className=" lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                        {customer?.user_name}
                      </td>

                      <td className="md:px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                        <Link to={`/admin/customer/${customer?.id}`}>
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

export default AllCustomers;
