import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { accountsRoute, transactionsRoute } from '../hooks/ApiRoutes';
import {
  getAccountsAndTransactionsFailure,
  getAccountsAndTransactionsSuccess,
} from '../redux/userSlice';
import { Account, UserState } from '../constants/types';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { currentUser, accountDetails, transactionsDetails } = useSelector(
    (state: { user: UserState }) => state.user
  );
  console.log('transactionsDetails', transactionsDetails);

  const primary_account = accountDetails.accounts.find(
    (account) => account.is_default === true
  );
  console.log('accountDetails', primary_account);

  const getUserAccountTransactions = async () => {
    try {
      const [accountData, transactionsData] = await Promise.all([
        axios.get(accountsRoute, currentUser.id),
        axios.get(transactionsRoute, currentUser.id),
      ]);

      const accountDetails = accountData.data;
      const transactionsDetails = transactionsData.data;
      console.log('accountDetails', accountDetails);
      console.log('transactionsDetails', transactionsDetails);
      const data = {
        accountDetails,
        transactionsDetails,
      };
      dispatch(getAccountsAndTransactionsSuccess(data));
    } catch (error: any) {
      console.error(error.message);
      dispatch(getAccountsAndTransactionsFailure(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAccountTransactions();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center">
          <p className="mt-10 uppercase italic underline font-bold text-xl md:text-2xl lg:text-3xl">
            My Profile
          </p>
          <div className="flex flex-col items-center">
            <div className="">
              <img
                className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px] mt-5"
                src={
                  currentUser?.profile_image?.url
                    ? currentUser?.profile_image?.url
                    : '../../public/placeholderImage2.jpg'
                }
                alt="profile_image"
              />
            </div>

            <div className="md:text-xl lg:text-2xl">
              <div className="flex text-[16px] gap-10 items-center">
                <p>
                  <span className="uppercase font-bold italic">
                    first name:{' '}
                  </span>
                  {currentUser?.first_name}
                </p>
                <p>
                  <span className="uppercase font-bold italic">
                    last name:{' '}
                  </span>
                  {currentUser?.last_name}
                </p>
              </div>
              <div className="flex gap-10 my-3 text-[16px]">
                <p className="">
                  <span className="uppercase font-bold italic">
                    user name:{' '}
                  </span>
                  {currentUser?.user_name}
                </p>
                <p>
                  <span className="uppercase font-bold italic">phone: </span>
                  {currentUser?.phone_number}
                </p>
              </div>

              <div className="flex gap-10 my-3 text-[16px]">
                <p className="text-[16px]">
                  <span className="uppercase font-bold italic">
                    Pry Account No:{' '}
                  </span>
                  {primary_account?.account_number}
                </p>
                {/* will still add other parameters here later */}
              </div>

              <div className="flex gap-10 my-3 text-[16px]">
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">email: </span>
                  {currentUser?.email}
                </p>
                {/* will still add other parameters here later */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
