import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleAccountOfAUserSuccess } from '../../../redux/adminSlice';
import { getSingleAccountOfAUserForAdmin } from '../../../hooks/ApiCalls';
import { AdminState } from '../../../constants/types';
import { formattedNumber } from '../../../hooks/functions';

const SingleAccountDetails = () => {
  const dispatch = useDispatch();

  const { singleAccountDetails } = useSelector(
    (state: { admin: AdminState }) => state.admin
  );

  console.log('singleAccountDetails', singleAccountDetails);

  const { accountId, userId } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchSingleAccountDetails = async () => {
    if (!userId || !accountId) {
      return null;
    }

    try {
      const response = await getSingleAccountOfAUserForAdmin({
        user_id: userId,
        account_id: accountId,
      });

      if (response.success === true) {
        dispatch(getSingleAccountOfAUserSuccess(response?.accountDetails));
        return;
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

  useEffect(() => {
    fetchSingleAccountDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center mt-16 gap-6">
          <p className="uppercase font-bold underline italic text-2xl">
            Owner Information
          </p>
          <div className="">
            <img
              className="w-32 h-32 rounded-full border border-primary"
              src={singleAccountDetails?.profile_image?.url}
              alt="user_profile_img"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 ">
              <p className="font-bold uppercase">Account Number:</p>
              <p>{singleAccountDetails?.account_number}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Account tier:</p>
              <p>{singleAccountDetails?.account_tier}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Balance</p>
              <p>#{formattedNumber(Number(singleAccountDetails?.balance))}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">fullname</p>
              <p>{`${singleAccountDetails?.first_name} ${singleAccountDetails?.last_name}`}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Email:</p>
              <p>{singleAccountDetails?.email} </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleAccountDetails;
