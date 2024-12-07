import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegHandPointRight } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { BiErrorAlt } from 'react-icons/bi';
import axios from 'axios';
import { getNotificationsSuccess } from '../redux/notificationSlice';
import { useDispatch } from 'react-redux';
import useApi from '../hooks/ApiCalls';

const PaystackCallback = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { callbackResult, getNotifications } = useApi();

  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');

  const [searchValue] = useState('');
  const [page] = useState(1);
  const limit = '10';

  const handleCallback = async () => {
    try {
      if (reference === null) {
        return null;
      }
      const { data } = await callbackResult(reference);

      if (data) {
        toast.success(data.message);

        const result = await getNotifications(
          page.toString(),
          limit,
          searchValue
        );
        dispatch(getNotificationsSuccess(result?.notifications));

        localStorage.removeItem('transactionRef');
        setSuccess(true);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : success ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <p className="text-xl md:text-2xl lg:text-4xl italic">
            Account credited successfully.
          </p>
          <GoVerified className="text-8xl my-4 text-green-600" />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-xl md:text-2xl lg:text-4xl italic">
            Failed to credit Account.
          </p>
          <BiErrorAlt className="text-8xl my-4 text-red-600" />
          <div className="flex items-center gap-3 justify-center">
            <p className="text-xl md:text-2xl lg:text-4xl italic">
              If you are not redirected in 5sec, click this
            </p>
            <FaRegHandPointRight className="text-xl md:text-3xl animate-ping" />
            <Link
              to="/credit"
              className="uppercase bg-primary text-2xl font-bold text-white p-2 rounded-lg"
            >
              Credit Account
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaystackCallback;
