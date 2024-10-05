import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserState } from '../constants/types';
import { formatDate } from '../hooks/functions';

const TransactionDetails = () => {
  const { transactionId } = useParams();

  const { transactionDetails } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const [actualTransaction] = transactionDetails?.filter(
    (transaction) => transaction.id === transactionId
  );

  return (
    <div className="flex flex-col items-center ml-[-150px] h-[3000px]">
      <p className="mt-10 uppercase italic mb-5 underline font-bold text-xl md:text-2xl lg:text-3xl">
        Transaction Details
      </p>

      <div className="flex flex-col items-center">
        <div className="pl-2 md:text-xl lg:text-2xl">
          <div className="flex flex-col text-[16px] items-start gap-4">
            <p className="">
              <span className="uppercase font-bold italic">Amount: </span>

              {actualTransaction.amount}
            </p>
            <p className="">
              <span className="uppercase font-bold italic">
                Transaction type:{' '}
              </span>

              {actualTransaction.transaction_type}
            </p>

            <p className="text-[14px]">
              <span className="uppercase font-bold italic">
                Transaction Date:{' '}
              </span>
              {formatDate(new Date(actualTransaction.transaction_date))}
            </p>
          </div>

          <div className="flex gap-10 my-3 text-[16px]">
            <p className="text-[16px]">
              <span className="uppercase font-bold italic">Account No: </span>
              {actualTransaction.account_number}
            </p>
          </div>

          <div className="flex flex-col items-start my-3 text-[16px]">
            <p className="text-center text-[16px]">
              <span className="uppercase font-bold italic">type: </span>
              {actualTransaction.transaction_type}
            </p>
            <p className="text-center text-[16px]">
              <span className="uppercase font-bold italic">status: </span>
              {actualTransaction.transaction_status}
            </p>
          </div>

          <div className="flex gap-10 my-3 text-[16px]">
            {actualTransaction.receiving_account && (
              <p className="text-center text-[16px]">
                <span className="uppercase font-bold italic">
                  receiving account:{' '}
                </span>
                {actualTransaction.receiving_account}
              </p>
            )}
            {actualTransaction.transaction_source && (
              <p className="text-center text-[16px]">
                <span className="uppercase font-bold italic">source: </span>
                {actualTransaction.transaction_source}
              </p>
            )}
          </div>
          <div className="flex my-3 gap-4">
            <p className="text-[14px]">
              <span className="uppercase font-bold italic">description: </span>

              {actualTransaction.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
