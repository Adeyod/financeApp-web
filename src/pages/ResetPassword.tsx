import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import Button from '../components/Button';
import { ResetPasswordRoute } from '../hooks/ApiRoutes';
import ImageFile from '../components/ImageFile';
import Form from '../components/Form';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../constants/styles';
import {
  ResetPasswordData,
  ResetPasswordKey,
  ResetPasswordParams,
} from '../constants/types';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { joiResetPasswordValidationSchema } from '../hooks/validation';

const resetPasswordParams: ResetPasswordParams[] = [
  {
    title: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter password...',
    field: 'password',
  },
  {
    title: 'Confirm Password',
    type: 'password',
    required: true,
    placeholder: 'Confirm password...',
    field: 'confirm_password',
  },
];

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<ResetPasswordData>({
    password: '',
    confirm_password: '',
  });

  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');
  const expiresAt = searchParams.get('expiresAt');

  const currentTime = Date.now();
  let expireTime = null;

  if (expiresAt) {
    expireTime = new Date(expiresAt).getTime();
  }

  useEffect(() => {
    if (expireTime && currentTime > expireTime) {
      navigate('/forgot-password');
      return;
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = joiResetPasswordValidationSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        toast.error(detail.message);
      });
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${ResetPasswordRoute}/${userId}/${token}`,
        formData
      );
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
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

  const handleChange = (key: ResetPasswordKey, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
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
                Reset password
              </p>

              {resetPasswordParams.map((param) => (
                <div className="">
                  <Form
                    key={param.field}
                    title={param.title}
                    type={param.type}
                    required={param.required}
                    placeholder={param.placeholder}
                    value={formData[param.field] || ''}
                    setValue={(value) => handleChange(param.field, value)}
                  />
                </div>
              ))}
            </motion.div>

            <Button
              title={'Reset Password'}
              loading={loading}
              buttonStyle={RegisterButtonStyle}
              buttonContainerStyle={RegisterButtonContainerStyle}
              buttonTextStyle={RegisterButtonTextStyle}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
