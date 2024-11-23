import { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AdminState } from '../../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate, formattedNumber } from '../../../hooks/functions';
import { getSingleTransactionOfAUserForAdmin } from '../../../hooks/ApiCalls';
import { getSingleTransactionOfAUserSuccess } from '../../../redux/adminSlice';

const SingleTransactionDetails = () => {
  const dispatch = useDispatch();

  const { singleTransactionDetails } = useSelector(
    (state: { admin: AdminState }) => state.admin
  );

  console.log('singleTransactionDetails', singleTransactionDetails);

  const { transactionId } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchSingleTransactionDetails = async () => {
    if (!transactionId) {
      return null;
    }

    try {
      const response = await getSingleTransactionOfAUserForAdmin(transactionId);

      console.log('fetchSingleTransactionDetails:', response);

      if (response.success === true) {
        dispatch(getSingleTransactionOfAUserSuccess(response?.transaction));
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
    fetchSingleTransactionDetails();
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

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 ">
              <p className="font-bold uppercase">Account Number:</p>
              <p>{singleTransactionDetails?.account_number}</p>
            </div>

            <div className="flex gap-2 ">
              <p className="font-bold uppercase">Account Holder:</p>
              <p>{`${singleTransactionDetails?.first_name} ${singleTransactionDetails?.last_name}`}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Transaction Type:</p>
              <p>{singleTransactionDetails?.transaction_type}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Transaction Status:</p>
              <p>{singleTransactionDetails?.transaction_status}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Transaction Date:</p>
              <p>
                {formatDate(
                  new Date(singleTransactionDetails?.transaction_date)
                )}
              </p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Amount</p>
              <p>
                #{formattedNumber(Number(singleTransactionDetails?.amount))}
              </p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Reference No:</p>
              <p>{singleTransactionDetails?.reference_number}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Description:</p>
              <p>{singleTransactionDetails?.description} </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTransactionDetails;
