import { useEffect, useState } from 'react';
import {
  fetchBankDetails,
  getAccountName,
  makeTransferToOtherBank,
} from '../../hooks/ApiCalls';
import Spinner from '../Spinner';
import Form from '../Form';
import { toast } from 'react-toastify';
import {
  joiOtherBanksValidationSchema,
  joiReceivingAccountSchema,
} from '../../hooks/validation';
import { BankProps, FundFlowProp, ReceiverInfo } from '../../constants/types';
import SmallSpinner from '../SmallSpinner';
import {
  RegisterButtonContainerStyle,
  RegisterButtonStyle,
  RegisterButtonTextStyle,
} from '../../constants/styles';
import Button from '../Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtherBanks = ({ selectedAccountNumber }: FundFlowProp) => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState<BankProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [amLoading, setAmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [receivingAccount, setReceivingAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [narration, setNarration] = useState('');
  const [logError, setLogError] = useState('');
  const [receiverDetails, setReceiverDetails] = useState<ReceiverInfo>({
    account_number: '',
    account_name: '',
    bank_code: '',
  });

  const dataToSend = {
    narration: narration,
    bankCode: bankCode,
    receiving_account: receivingAccount,
    selectedAccountNumber: selectedAccountNumber,
    amount: amount,
    receiverDetails: receiverDetails,
  };

  const data = {
    receiving_account: receivingAccount,
  };
  const formData = {
    amount: amount,
    narration: narration,
  };

  const getBankNames = async () => {
    try {
      const result = await fetchBankDetails();
      setBanks(result.banks);
      return;
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

  const getReceiverAccountName = async () => {
    try {
      setIsLoading(true);
      const { error } = joiReceivingAccountSchema.validate(data, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        error.details.forEach((detail) => {
          console.log(detail.message);
          toast.error(detail.message);
        });
        return;
      }

      if (!selectedBank) {
        console.error('Please select the receiving bank');
      }

      if (!receivingAccount) {
        console.error('Please select the receiving account');
        toast.error('Please select the receiving account');
      }

      const actualBankObj = banks.filter((bank) => bank.name === selectedBank);

      if (!actualBankObj) {
        toast.error('Please select  a bank');
        return;
      }

      setBankCode(actualBankObj[0].code);

      setReceiverDetails((prevDetails) => ({
        ...prevDetails,
        bank_code: actualBankObj[0].code,
      }));

      const response = await getAccountName(
        receivingAccount,
        actualBankObj[0].code
      );

      console.log(response);

      if (response) {
        setReceiverDetails({
          ...receiverDetails,
          account_name: response.receiverDetails.account_name,
          account_number: response.receiverDetails.account_number,
        });
        console.log(receivingAccount);

        console.log(receiverDetails);
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        setLogError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setAmLoading(true);
      const { error } = joiOtherBanksValidationSchema.validate(formData, {
        abortEarly: false,
      });

      if (error) {
        console.log(error);
        error.details.forEach((detail) => {
          console.log(detail.message);
          toast.error(detail.message);
        });
        return;
      }

      if (!selectedAccountNumber) {
        console.error('Please select the account to be debited');
        toast.error('Please select the account to be debited');
        return;
      }

      if (!selectedBank) {
        console.error('Please select the receiving bank');
        toast.error('Please select the receiving bank');
        return;
      }

      if (!receivingAccount) {
        console.error('Please select the receiving account');
        toast.error('Please select the receiving account');
        // return;
      }

      const response = await makeTransferToOtherBank(dataToSend);

      if (response) {
        // setReceiverDetails(response?.receiverDetails);
        // console.log(receivingAccount);
        // console.log(receiverDetails);
        navigate('/transactions');
        return;
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        setLogError(error.response.data.message);
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setAmLoading(false);
    }
  };

  const handleBank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedBank(e.target.value);
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleCreditedAccount = (text: string) => {
    setReceivingAccount(text);
  };

  const handleNarration = (text: string) => {
    setNarration(text);
  };

  useEffect(() => {
    if (receivingAccount.length === 10 && selectedBank) {
      getReceiverAccountName();
    }
  }, [receivingAccount, selectedBank]);

  useEffect(() => {
    getBankNames();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <form
            onSubmit={handleSubmit}
            className="lg:w-[30vw] md:w-[40vw] w-[50vw] mt-5 justify-center items-center flex flex-col"
            action=""
          >
            <div className="flex flex-col items-center">
              <p className="text-start mr-[240px] uppercase font-bold">bank</p>
              <select
                name="account_number"
                id="account_number"
                className="border px-4 py-2 rounded-md w-[70%]"
                value={selectedBank}
                onChange={handleBank}
              >
                <option value="" disabled className="">
                  Choose bank
                </option>
                {banks.map((bank, index) => (
                  <option value={bank?.name} key={index} className="">
                    {bank?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-[70%]">
              <Form
                title={'Receiving Account'}
                type={'text'}
                required={true}
                placeholder={'Enter the account number you want to credit...'}
                value={receivingAccount}
                setValue={handleCreditedAccount}
              />
              <div className=" flex mb-[-15px] mt-[3px] gap-10">
                <p className="text-[12px] uppercase">
                  {isLoading ? (
                    <SmallSpinner />
                  ) : receiverDetails?.account_name ? (
                    receiverDetails?.account_name
                  ) : logError ? (
                    logError
                  ) : (
                    ''
                  )}
                </p>
              </div>
              <Form
                title={'Amount'}
                type={'text'}
                required={true}
                placeholder={
                  'Enter the amount you want to send to the account...'
                }
                value={amount}
                setValue={handleAmountChange}
              />

              <Form
                title={'Narration'}
                type={'text'}
                required={false}
                placeholder={'Narration...'}
                value={narration}
                setValue={handleNarration}
              />
            </div>
            <Button
              title={'Transfer'}
              loading={amLoading}
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

export default OtherBanks;
