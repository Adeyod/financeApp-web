import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { callbackResult } from '../hooks/ApiCalls';
import { useDispatch } from 'react-redux';
import { FaRegHandPointRight } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { BiErrorAlt } from 'react-icons/bi';

const PaystackCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const reference = searchParams.get('reference');

  const handleCallback = async () => {
    try {
      if (reference === null) {
        return null;
      }
      const { data } = await callbackResult(reference);

      if (data) {
        toast.success(data.message);

        setSuccess(true);
        return;
      }
    } catch (error: any) {
      console.error(error.message);
      setFailure(true);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  useEffect(() => {
    navigateUser();
  }, [loading, success, failure, navigate]);

  const navigateUser = () => {
    const timer = setTimeout(() => {
      if (!loading && success) {
        navigate('/accounts');
      } else if (!loading && failure) {
        navigate('/credit');
      }
    }, 5000);
  };

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
          <div className="flex items-center gap-3 justify-center">
            <p className="text-xl md:text-2xl lg:text-4xl italic">
              If you are not redirected in 5sec, click this
            </p>
            <FaRegHandPointRight className="text-3xl animate-ping" />

            <Link
              to="/accounts"
              className="uppercase bg-primary text-2xl font-bold text-white p-2 rounded-lg italic"
            >
              My Accounts
            </Link>
          </div>
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
