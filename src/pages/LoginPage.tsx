import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

import ImageFile from '../components/ImageFile';
import {
  LoginFormData,
  LoginFormDataKey,
  LoginParams,
} from '../constants/types';
import Form from '../components/Form';
import Button from '../components/Button';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../constants/styles';
import { LoginRoute } from '../hooks/ApiRoutes';
import { joiLoginValidationSchema } from '../hooks/validation';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const loginParams: LoginParams[] = [
  {
    title: 'email or username',
    type: 'text',
    required: true,
    placeholder: 'Enter email or username...',
    field: 'login_input',
  },
  {
    title: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter password...',
    field: 'password',
  },
];

axios.defaults.withCredentials = true;
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state: any) => state.user);

  let [formData, setFormData] = useState<LoginFormData>({
    login_input: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = joiLoginValidationSchema.validate(formData, {
      abortEarly: false,
    });

    if (error) {
      error.details.forEach((detail) => {
        console.log(detail);
        toast.error(detail.message);
      });
      return;
    }

    dispatch(loginStart());
    try {
      const { data } = await axios.post(LoginRoute, formData);

      if (data) {
        toast.success(data.message);
        dispatch(loginSuccess(data));
        navigate('/profile');
        return;
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(loginFailure(error));
    }
  };

  const handleChange = (key: LoginFormDataKey, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
      <form
        action=""
        className="lg:w-[30vw] md:w-[40vw] w-[50vw]"
        onSubmit={handleSubmit}
      >
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 30, duration: 1.5 }}
          initial={{ x: '100vw', opacity: 0 }}
        >
          <p className="uppercase text-3xl text-center font-bold underline">
            Login
          </p>
          {loginParams.map((param) => (
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
          title={'Login'}
          loading={loading}
          buttonStyle={RegisterButtonStyle}
          buttonContainerStyle={RegisterButtonContainerStyle}
          buttonTextStyle={RegisterButtonTextStyle}
        />
        <div className="mg:flex gap-3">
          <div className="flex gap-1 italic text-[14px] mt-2">
            <p>Don't have an account?</p>
            <Link className="font-bold text-blue-500 underline" to="/register">
              Register
            </Link>
          </div>
          <div className="flex gap-1 text-[14px] italic mt-2">
            <p>Forgot Password?</p>
            <Link
              className="font-bold text-blue-500 underline"
              to="/forgot-password"
            >
              Click here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
