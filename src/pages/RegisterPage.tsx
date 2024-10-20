import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';

import Form from '../components/Form';
import Phone from '../components/Phone';
import { FormData, FormDataKey, RegisterParams } from '../constants/types';
import Button from '../components/Button';
import { RegisterRoute } from '../hooks/ApiRoutes';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../constants/styles';
import ImageFile from '../components/ImageFile';
import { joiRegisterValidationSchema } from '../hooks/validation';
import { Link } from 'react-router-dom';

const registerParams: RegisterParams[] = [
  {
    title: 'first name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name...',
    field: 'first_name',
  },
  {
    title: 'user name',
    type: 'text',
    required: true,
    placeholder: 'Enter user name...',
    field: 'user_name',
  },
  {
    title: 'Last name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name...',
    field: 'last_name',
  },
  {
    title: 'email address',
    type: 'email',
    required: true,
    placeholder: 'Enter email...',
    field: 'email',
  },
  {
    title: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter password...',
    field: 'password',
  },
  {
    title: 'Confirm password',
    type: 'password',
    required: true,
    placeholder: 'Confirm password...',
    field: 'confirm_password',
  },
];

const RegisterPage = () => {
  const [phoneValue, setPhoneValue] = useState('+2348100987235');
  const [loading, setLoading] = useState(false);
  let [formData, setFormData] = useState<FormData>({
    first_name: 'Fola',
    user_name: 'Folly',
    last_name: 'Adebolu',
    email: 'votinggivers@gmail.com',
    password: '$Password@6910',
    confirm_password: '$Password@6910',
  });

  formData = { ...formData, phone_number: phoneValue };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = joiRegisterValidationSchema.validate(formData, {
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
      const { data } = await axios.post(RegisterRoute, formData);

      if (data) {
        toast.success(data.message);
        console.log(data);
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

  const handleChange = (key: FormDataKey, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div className="flex lg:justify-around md:gap-[100px] justify-center items-center md:px-10 lg:px-20 py-10">
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
            Registration
          </p>
          {registerParams.map((param) => (
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

        <Phone value={phoneValue} setValue={setPhoneValue} />

        <Button
          title={'Register'}
          loading={loading}
          handleSubmit={handleSubmit}
          buttonStyle={RegisterButtonStyle}
          buttonContainerStyle={RegisterButtonContainerStyle}
          buttonTextStyle={RegisterButtonTextStyle}
        />
        <div className="flex gap-3 italic mt-2">
          <p>Have an account?</p>
          <Link className="font-bold text-blue-500 underline" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
