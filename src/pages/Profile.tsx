import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { ImageUploadRoute } from '../hooks/ApiRoutes';
import {
  getAccountsFailure,
  getAccountsSuccess,
  loginSuccess,
} from '../redux/userSlice';
import { Account, UserState } from '../constants/types';
import { toast } from 'react-toastify';
import { getUserAccounts } from '../hooks/ApiCalls';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState<string>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log(selectedFile);
  const [buttonText, setButtonText] = useState('Change Image');

  const fileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const uploadImage = async () => {
    try {
      console.log('i am trying to upload');

      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else {
        console.error('File is null');
      }
      console.log(formData);

      const { data } = await axios.post(ImageUploadRoute, formData);

      if (data) {
        toast.success(data.message);
        dispatch(loginSuccess(data));
        return;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log('FileReader loaded:', file, reader.result);
        setImgUrl(reader.result as string); // Preview the selected image
        setSelectedFile(file); // Store the selected file
        setButtonText('Upload Image');
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Please select a file');
    }
  };

  const handleFilePick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const { currentUser, accountDetails } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const primary_account = accountDetails?.accounts?.find(
    (account) => account.is_default === true
  );

  const getUserAccountTransactions = async () => {
    try {
      const accountData = await getUserAccounts();

      const accountDetails = accountData?.data;

      dispatch(getAccountsSuccess(accountDetails));
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
      dispatch(getAccountsFailure(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserAccountTransactions();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center h-[3000px]">
          <p className="mt-10 uppercase italic underline font-bold text-xl md:text-2xl lg:text-3xl">
            My Profile
          </p>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-4">
              <img
                className="w-[100px] h-[100px] rounded-full lg:w-[150px] lg:h-[150px] mt-5"
                src={
                  imgUrl
                    ? imgUrl
                    : currentUser?.profile_image?.url
                    ? currentUser?.profile_image?.url
                    : '../../public/placeholderImage2.jpg'
                }
                alt="profile_image"
              />
              <div className="">
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-green-600 text-white text-[15px] px-3 italic uppercase rounded-full"
                    onClick={handleFilePick}
                  >
                    Change Image
                  </button>
                  <button
                    className="bg-green-600 text-white text-[15px] px-3 italic uppercase rounded-full"
                    onClick={uploadImage}
                    disabled={!selectedFile}
                  >
                    Upload Image
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={fileRef}
                  onChange={handleImgChange}
                />
              </div>
            </div>

            <div className="pl-2 md:text-xl lg:text-2xl">
              <div className="flex text-[16px] items-center gap-4">
                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    first name:{' '}
                  </span>

                  {currentUser?.first_name}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    user name:{' '}
                  </span>
                  {currentUser?.user_name}
                </p>
              </div>
              <div className="flex my-3 gap-4">
                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    last name:{' '}
                  </span>

                  {currentUser?.last_name}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">phone: </span>
                  <input
                    className="w-[50%] text-[14px]"
                    type="text"
                    value={currentUser?.phone_number}
                  />
                </p>
              </div>

              <div className="flex gap-10 my-3 text-[16px]">
                <p className="text-[16px]">
                  <span className="uppercase font-bold italic">
                    Pry Account No:{' '}
                  </span>
                  {primary_account?.account_number}
                </p>
              </div>

              <div className="flex gap-10 my-3 text-[16px]">
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">email: </span>
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <button className="bg-green-600 text-white text-[15px] px-3 italic uppercase rounded-full">
              Update profile
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
