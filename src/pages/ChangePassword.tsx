import { useState } from 'react';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageFile from '../components/ImageFile';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Form from '../components/Form';
import {
  ChangePasswordData,
  ChangePasswordKey,
  ChangePasswordParams,
} from '../constants/types';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../constants/styles';
import { changeUserPassword } from '../hooks/ApiCalls';

const changePasswordParams: ChangePasswordParams[] = [
  {
    title: 'Current password',
    type: 'password',
    required: true,
    field: 'current_password',
    placeholder: 'Please enter your current password',
  },
  {
    title: 'New password',
    type: 'password',
    required: true,
    field: 'new_password',
    placeholder: 'Please enter your new password',
  },
  {
    title: 'Confirm new password',
    type: 'password',
    required: true,
    field: 'confirm_new_password',
    placeholder: 'Confirm new password',
  },
];

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ChangePasswordData>({
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(loading);
      console.log('I am submitting');

      const current_password = formData.current_password;
      const new_password = formData.new_password;
      const confirm_new_password = formData.confirm_new_password;

      const data = await changeUserPassword(
        current_password,
        new_password,
        confirm_new_password
      );

      if (data) {
        toast.success(data.message);
        setFormData({
          current_password: '',
          new_password: '',
          confirm_new_password: '',
        });
        navigate('/profile');
        return;
      }
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (key: ChangePasswordKey, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  return (
    <div>
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

              {changePasswordParams.map((param) => (
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
              title={'Change Password'}
              loading={loading}
              buttonStyle={RegisterButtonStyle}
              buttonContainerStyle={RegisterButtonContainerStyle}
              buttonTextStyle={RegisterButtonTextStyle}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
