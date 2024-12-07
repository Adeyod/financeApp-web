import { useEffect, useState } from 'react';
import Form from '../Form';
import Button from '../Button';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../../constants/styles';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FundFlowProp, ReceiverProp } from '../../constants/types';
import { joiReceivingAccountSchema } from '../../hooks/validation';
import SmallSpinner from '../SmallSpinner';
import { getNotificationsSuccess } from '../../redux/notificationSlice';
import { useDispatch } from 'react-redux';
import useApi from '../../hooks/ApiCalls';

const FundFlow = ({ selectedAccountNumber }: FundFlowProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getFundFlowReceivingAccountName,
    getNotifications,
    makeTransferToFundFlowAccount,
  } = useApi();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [receivingAccount, setReceivingAccount] = useState('');
  const [description, setDescription] = useState('');
  const [logError, setLogError] = useState('');
  const [receiverDetails, setReceiverDetails] = useState<ReceiverProp>({
    first_name: '',
    last_name: '',
  });

  const [searchValue] = useState('');
  const [page] = useState(1);
  const limit = '10';

  console.log(receiverDetails);

  const handleChange = (text: string) => {
    setAmount(text);
  };
  const handleAccountChange = (text: string) => {
    setReceivingAccount(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  console.log(selectedAccountNumber);

  const handleTransferToAnotherFundFlowAccount = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!selectedAccountNumber) {
        toast.error('Please select transferring account number');
        return;
      }

      if (!amount) {
        toast.error('Please select transfer amount');
      }

      if (!receivingAccount) {
        toast.error('Please select receiving account number');
      }

      const data = {
        selected_account_number: selectedAccountNumber,
        receiving_account_number: receivingAccount.trim(),
        amount: amount.trim(),
        description: description.trim(),
        receiver_account_name: `${receiverDetails?.first_name} ${receiverDetails?.last_name}`,
      };

      const response = await makeTransferToFundFlowAccount(data);

      if (response.status === 200 && response?.data?.success === true) {
        toast.success(response?.data?.message);
        const result = await getNotifications(
          page.toString(),
          limit,
          searchValue
        );
        dispatch(getNotificationsSuccess(result?.notifications));
        navigate(`/accounts`);
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

  const data = { receiving_account: receivingAccount };

  const getReceiverAccountName = async () => {
    try {
      setIsLoading(true);
      const { error } = joiReceivingAccountSchema.validate(data, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        error.details.forEach((detail) => {
          toast.error(detail.message);
        });
        return;
      }

      if (!selectedAccountNumber) {
        console.error('Please select the receiving bank');
      }

      if (!receivingAccount) {
        console.error('Please select the receiving account');
        toast.error('Please select the receiving account');
      }

      const response = await getFundFlowReceivingAccountName(receivingAccount);

      console.log(response);
      if (response) {
        setReceiverDetails({
          first_name: response?.receiverDetails?.first_name,
          last_name: response?.receiverDetails?.last_name,
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        setLogError(error.response.data.message.slice(0, 20));
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (receivingAccount.length === 10) {
      getReceiverAccountName();
    }
  }, [receivingAccount]);

  return (
    <div className="min-w-[30vw] w-[100%] flex flex-col items-center">
      <form
        onSubmit={handleTransferToAnotherFundFlowAccount}
        className="lg:w-[30vw] md:w-[40vw] mt-5 justify-center items-center flex flex-col"
        action=""
      >
        <div className="w-[85vw] lg:w-[30vw]">
          <Form
            title={'Amount'}
            type={'text'}
            required={true}
            placeholder={'Enter the amount you want to send to the account...'}
            value={amount}
            setValue={handleChange}
          />
          <Form
            title={'Receiving Account'}
            type={'text'}
            required={true}
            placeholder={'Enter the account number you want to credit...'}
            value={receivingAccount}
            setValue={handleAccountChange}
          />

          <div className=" flex mb-[-5px] mt-[3px] gap-10">
            <p className="text-[15px] uppercase font-bold">
              {isLoading ? (
                <SmallSpinner />
              ) : receiverDetails?.first_name ? (
                `${receiverDetails?.first_name} ${receiverDetails?.last_name}`
              ) : logError ? (
                logError
              ) : (
                ''
              )}
            </p>
          </div>

          <Form
            title={'narration'}
            type={'text'}
            required={true}
            placeholder={'Narration'}
            value={description}
            setValue={handleDescriptionChange}
          />
        </div>
        {/* <div className=""> */}
        <Button
          title={'Credit Account'}
          loading={loading}
          buttonStyle={RegisterButtonStyle}
          buttonContainerStyle={RegisterButtonContainerStyle}
          buttonTextStyle={RegisterButtonTextStyle}
        />
        {/* </div> */}
      </form>
    </div>
  );
};

export default FundFlow;
