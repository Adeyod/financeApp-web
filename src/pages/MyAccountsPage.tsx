import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../constants/types';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { capitalizeFirstLetter, formatDate } from '../hooks/functions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNewAccountNumber, getUserAccounts } from '../hooks/ApiCalls';
import { getAccountsStart, getAccountsSuccess } from '../redux/userSlice';

const MyAccountsPage = () => {
  const dispatch = useDispatch();
  const { accountDetails, currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );
  const [loading, setLoading] = useState(false);

  const findUserAccounts = async () => {
    try {
      setLoading(true);
      const { data } = await getUserAccounts();

      if (data) {
        toast.success(data.message);

        dispatch(getAccountsSuccess(data));
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findUserAccounts();
  }, []);

  const handleCreateAccount = async () => {
    try {
      dispatch(getAccountsStart());
      const response = await createNewAccountNumber();

      if (response) {
        toast.success(response?.data?.message);
        const userAccounts = await getUserAccounts();
        console.log(userAccounts);
        dispatch(getAccountsSuccess(userAccounts?.data));
        return;
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="mt-10 ml-5 mb-3">
        <p className="text-xl">
          Hello, {capitalizeFirstLetter(currentUser?.user_name)} you are welcome
          back
        </p>
        <div className="">
          <p className="text-xl">
            You can create maximum of 5 account numbers as a user on this
            platform.
          </p>
          <button
            type="submit"
            onClick={handleCreateAccount}
            className="border bg-secondary p-2 mt-4 rounded-lg text-white uppercase font-bold italic"
          >
            {loading ? 'LOADING...' : 'create account'}
          </button>
        </div>
      </div>

      <div className="overflow-auto w-[100%]">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full divide-y divide-gray-200 h-16 py-10">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Account Number
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Balance
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Date Opened
                </th>
                <th className="w-1/7 px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    <Spinner />
                  </td>
                </tr>
              ) : accountDetails?.accounts?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    <div className="flex flex-col items-center">
                      <img src={'../../public/diamond1.jfif'} alt="" />
                      <p className="text-[#AB2638] font-extrabold text-[16px] ">
                        You have no account yet 😑
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                accountDetails?.accounts?.map((account, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 flex gap-2 whitespace-nowrap text-sm text-gray-500">
                      {account?.account_number}

                      {account?.is_default === true && (
                        <p className="uppercase">(primary)</p>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account?.balance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(new Date(account?.created_at))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                      <Link to={`/account/${account?.id}`}>view details</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAccountsPage;
