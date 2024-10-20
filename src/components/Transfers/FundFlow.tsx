import { useState } from 'react';
import Form from '../Form';
import Button from '../Button';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../../constants/styles';
import { toast } from 'react-toastify';
import { makeTransferToFundFlowAccount } from '../../hooks/ApiCalls';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FundFlowProp } from '../../constants/types';

const FundFlow = ({ selectedAccountNumber }: FundFlowProp) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [receivingAccount, setReceivingAccount] = useState('');
  const [description, setDescription] = useState('');

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
      };

      const response = await makeTransferToFundFlowAccount(data);

      console.log(response);

      if (response.status === 200 && response?.data?.success === true) {
        toast.success(response?.data?.message);
        navigate(`/accounts`);
        return;
        // }
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

  console.log('RECEIVING ACCOUNT:', receivingAccount);
  console.log('AMOUNT:', amount);
  console.log('SELECTED ACCOUNT:', selectedAccountNumber);

  return (
    <div className="min-w-[30vw] flex flex-col items-center">
      <form onSubmit={handleTransferToAnotherFundFlowAccount} action="">
        <div className="w-[100%]">
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
          <Form
            title={'narration'}
            type={'text'}
            required={true}
            placeholder={'Narration'}
            value={description}
            setValue={handleDescriptionChange}
          />
        </div>
        <div className="w-[100%]">
          <Button
            title={'Credit Account'}
            loading={loading}
            buttonStyle={RegisterButtonStyle}
            buttonContainerStyle={RegisterButtonContainerStyle}
            buttonTextStyle={RegisterButtonTextStyle}
          />
        </div>
      </form>
    </div>
  );
};

export default FundFlow;
