import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

import ImageFile from '../components/ImageFile';
import Form from '../components/Form';
import { ForgotPasswordRoute } from '../hooks/ApiRoutes';
import Button from '../components/Button';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loadingStop, loginStart } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { joiForgotPasswordValidationSchema } from '../hooks/validation';
import { UserState } from '../constants/types';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('ayodejiadebolu@gmail.com');

  const { loading } = useSelector((state: { user: UserState }) => state.user);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = joiForgotPasswordValidationSchema.validate(
      { email },
      {
        abortEarly: false,
      }
    );

    if (error) {
      error.details.forEach((detail) => {
        toast.error(detail.message);
      });
      return;
    }

    dispatch(loginStart());
    try {
      const { data } = await axios.post(ForgotPasswordRoute, { email });
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate('/');
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
      dispatch(loadingStop());
    }
  };

  const handleChange = (value: string) => {
    setEmail(value);
  };

  return (
    <div className="flex mt-[70px] lg:justify-around md:gap-[100px] justify-center items-center md:px-10 lg:px-20 py-10">
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 20, duration: 5 }}
        initial={{ x: '-100vw', opacity: 0 }}
      >
        <ImageFile />
      </motion.div>
      <form action="" className="" onSubmit={handleSubmit}>
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 30, duration: 1.5 }}
          initial={{ x: '100vw', opacity: 0 }}
        >
          <p className="uppercase text-3xl text-center font-bold underline">
            Forgot password
          </p>

          <div className="">
            <Form
              title={'email'}
              type={'email'}
              required={true}
              placeholder={'Enter email...'}
              value={email}
              setValue={(value) => handleChange(value)}
            />
          </div>
        </motion.div>

        <Button
          title={'Submit'}
          loading={loading}
          buttonStyle={RegisterButtonStyle}
          buttonContainerStyle={RegisterButtonContainerStyle}
          buttonTextStyle={RegisterButtonTextStyle}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
