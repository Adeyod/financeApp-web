import { CreditOptionsType } from '../constants/types';
import { formattedNumber } from '../hooks/functions';

const CreditOptions = ({
  singleAccountCompletedTransactionsCount,
  singleAccountTotalTransactionsCount,
  accountInfo,
  selectedAccountNumber,
}: CreditOptionsType) => {
  return (
    <div className="mx-4 md:ml-16 mlg:ml-20">
      <div className="q-stat md:w-[70%] flex flex-col lg:ml-0 slg:ml-0 mlg:ml-20  md:ml-[300px] lg:flex-row justify-evenly lg:items-center slg:items-center mlg:items-center min-w-[100%] gap-4 md:gap-0">
        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Balance
              </div>
              <div className="text-white font-bold italic text-xl md:text-[12px] border px-2 rounded-lg items-center justify-center flex">
                {accountInfo?.accounts?.balance && selectedAccountNumber
                  ? `#${formattedNumber(
                      Number(accountInfo?.accounts?.balance)
                    )}`
                  : `#0`}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Total transactions
              </div>
              <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
                {singleAccountTotalTransactionsCount && selectedAccountNumber
                  ? singleAccountTotalTransactionsCount
                  : 0}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Completed transactions
              </div>

              <div className="text-white md:text-[15px] font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
                {singleAccountCompletedTransactionsCount &&
                selectedAccountNumber
                  ? singleAccountCompletedTransactionsCount
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOptions;
