import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TransactionState } from '../constants/types';
import { formatDate, formattedNumber } from '../hooks/functions';
import { toast } from 'react-toastify';
import { getSingleTransactionByTransactionId } from '../hooks/ApiCalls';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { getSingleTransactionSuccess } from '../redux/transactionSlice';
import axios from 'axios';

const TransactionDetails = () => {
  const dispatch = useDispatch();
  const { transactionId } = useParams();
  const [loading, setLoading] = useState(true);

  const { singleTransactionDetails } = useSelector(
    (state: { transactions: TransactionState }) => state.transactions
  );

  console.log(singleTransactionDetails);

  const fetchExactTransaction = async () => {
    try {
      if (transactionId === undefined) {
        return null;
      }
      const response = await getSingleTransactionByTransactionId(transactionId);

      if (response) {
        dispatch(getSingleTransactionSuccess(response.transaction));
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

  useEffect(() => {
    fetchExactTransaction();
  }, [transactionId]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="mt-10 uppercase italic mb-5 underline font-bold text-xl md:text-2xl lg:text-3xl">
            Transaction Details
          </p>

          <div className="flex flex-col items-center">
            <div className="pl-2 md:text-xl lg:text-2xl">
              <div className="flex flex-col text-[16px] items-start">
                <p className="">
                  <span className="uppercase font-bold italic">Amount: </span>
                  {
                    singleTransactionDetails?.transaction_type === 'debit' && (
                      // <div className="">
                      <span className="text-2xl">-</span>
                    )
                    // </div>
                  }
                  #{formattedNumber(Number(singleTransactionDetails?.amount))}
                </p>
                <p className="">
                  <span className="uppercase font-bold italic">
                    Transaction type:{' '}
                  </span>
                  {singleTransactionDetails?.transaction_type}
                </p>

                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    Transaction Date:{' '}
                  </span>

                  {formatDate(
                    new Date(singleTransactionDetails?.transaction_date)
                  )}
                </p>
              </div>

              <div className="flex gap-10 text-[16px]">
                <p className="text-[16px]">
                  <span className="uppercase font-bold italic">
                    Account No:{' '}
                  </span>
                  {singleTransactionDetails?.account_number}
                </p>
              </div>

              <div className="flex flex-col items-start text-[16px]">
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">
                    reference:{' '}
                  </span>
                  {singleTransactionDetails?.reference_number}
                </p>
                <p className="text-center text-[16px]">
                  <span className="uppercase font-bold italic">status: </span>
                  {singleTransactionDetails?.transaction_status}
                </p>
              </div>

              {/* sender account number, sender bank, sender name */}

              {/* // reference number, receiving account number, receiving bank, receiving account name */}

              {/* <div className="flex gap-10 text-[13px]">
                {singleTransactionDetails?.receiving_account && (
                  <p className="text-center text-[16px]">
                    <span className="uppercase font-bold italic">
                      receiving account:{' '}
                    </span>
                    {singleTransactionDetails?.receiving_account?.slice(0, 3) +
                      'xxx' +
                      singleTransactionDetails?.receiving_account?.slice(
                        29,
                        32
                      )}
                  </p>
                )}
                {singleTransactionDetails?.transaction_source && (
                  <p className="text-center text-[16px]">
                    <span className="uppercase font-bold italic">source: </span>
                    {singleTransactionDetails?.transaction_source}
                  </p>
                )}
              </div> */}

              <div className="flex gap-4 mb-5">
                <p className="text-[14px]">
                  <span className="uppercase font-bold italic">
                    description:{' '}
                  </span>
                  {singleTransactionDetails?.description}
                </p>
              </div>

              <div className="flex flex-col items-start">
                <p className="uppercase text-[18px] font-bold">
                  {singleTransactionDetails?.transaction_type === 'debit' ? (
                    <span> receiver</span>
                  ) : (
                    <span>sender</span>
                  )}{' '}
                  details
                </p>

                {singleTransactionDetails?.receiving_account_number ? (
                  <p className="text-center text-[13px]">
                    <span className="uppercase font-bold italic">
                      account number:{' '}
                    </span>
                    {singleTransactionDetails?.receiving_account_number}
                  </p>
                ) : singleTransactionDetails?.receiving_account ? (
                  singleTransactionDetails?.receiving_account?.slice(0, 3) +
                  'xxx' +
                  singleTransactionDetails?.receiving_account?.slice(29, 32)
                ) : (
                  ''
                )}
                {singleTransactionDetails?.receiving_bank_name && (
                  <p className="text-center text-[13px]">
                    <span className="uppercase font-bold italic">bank: </span>
                    {singleTransactionDetails?.receiving_bank_name}
                  </p>
                )}
                {singleTransactionDetails?.receiver_account_name && (
                  <p className="text-center text-[13px]">
                    <span className="uppercase font-bold italic">name: </span>
                    {singleTransactionDetails?.receiver_account_name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionDetails;
