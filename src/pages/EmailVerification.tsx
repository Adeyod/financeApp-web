import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoVerified } from 'react-icons/go';
import { FaRegHandPointRight } from 'react-icons/fa';
import { BiErrorAlt } from 'react-icons/bi';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { EmailVerificationRoute } from '../hooks/ApiRoutes';

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const handleVerification = async () => {
    try {
      const { data } = await axios.get(
        `${EmailVerificationRoute}/${userId}/${token}`
      );
      if (data.success) {
        toast.success(data.message);
        setIsVerified(true);
        return;
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : isVerified ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <p className="text-xl md:text-2xl lg:text-4xl italic">
            Your email has been successfully verified
          </p>
          <GoVerified className="text-8xl my-4 text-green-600" />
          <div className="flex items-center gap-3 justify-center">
            <p className="text-xl md:text-2xl lg:text-4xl italic">
              Click the button to login
            </p>
            <FaRegHandPointRight className="text-3xl animate-ping" />

            <Link
              to="/login"
              className="uppercase bg-primary text-2xl font-bold text-white p-2 rounded-lg italic"
            >
              Login
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-xl md:text-2xl lg:text-4xl italic">
            Email verification failed
          </p>
          <BiErrorAlt className="text-8xl my-4 text-red-600" />
          <div className="flex items-center gap-3 justify-center">
            <p className="text-xl md:text-2xl lg:text-4xl italic">
              Click to go back home
            </p>
            <FaRegHandPointRight className="text-xl md:text-3xl animate-ping" />
            <Link
              to="/"
              className="uppercase bg-primary text-2xl font-bold text-white p-2 rounded-lg"
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
