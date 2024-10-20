import { CreditOptionsType } from '../constants/types';
import { formattedNumber } from '../hooks/functions';

const CreditOptions = ({
  singleAccountCompletedTransactionsCount,
  singleAccountTotalTransactionsCount,
  accountInfo,
  selectedAccountNumber,
}: CreditOptionsType) => {
  // return (
  //   <div className="ml-10 md:ml-64 p-4 transition-all duration-300">
  //     {' '}
  //     {/* Adjust margin to accommodate sidebar */}
  //     <div className="q-stat w-full flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-0">
  //       {/* Balance */}
  //       <div className="w-full md:w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
  //         <div className="flex gap-2 justify-center items-center">
  //           <div className="border-4 border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
  //           <div className="flex gap-2 justify-center items-center">
  //             <div className="text-white font-bold italic">Balance</div>
  //             <div className="text-white font-bold italic text-xl border px-2 rounded-lg items-center justify-center flex">
  //               {accountInfo?.accounts?.balance && selectedAccountNumber
  //                 ? `#${accountInfo?.accounts?.balance}`
  //                 : `#0`}
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Total Transactions */}
  //       <div className="w-full md:w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
  //         <div className="flex gap-2 justify-center items-center">
  //           <div className="border-4 border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
  //           <div className="flex gap-2 justify-center items-center">
  //             <div className="text-white font-bold italic">
  //               Total transactions
  //             </div>
  //             <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
  //               {singleAccountTotalTransactionsCount && selectedAccountNumber
  //                 ? singleAccountTotalTransactionsCount
  //                 : 0}
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Completed Transactions */}
  //       <div className="w-full md:w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary ">
  //         <div className="flex gap-2 justify-center items-center">
  //           <div className="border-4 border-[#FFF7E7] h-5 w-5 rounded-full bg-[#FFC453] p-2"></div>
  //           <div className="flex gap-2 justify-center items-center">
  //             <div className="text-white font-bold italic">
  //               Completed transactions
  //             </div>
  //             <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
  //               {singleAccountCompletedTransactionsCount &&
  //               selectedAccountNumber
  //                 ? singleAccountCompletedTransactionsCount
  //                 : 0}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  //////////////////////////////////////////////////
  return (
    <div className="ml-16 mlg:ml-20">
      <div className="q-stat w-[70%] flex flex-col lg:ml-0 slg:ml-0 mlg:ml-20  md:ml-[300px] lg:flex-row justify-evenly lg:items-center slg:items-center mlg:items-center min-w-[100%] gap-4 md:gap-0">
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
