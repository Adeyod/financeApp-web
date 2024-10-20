import { TransactionType } from '../../constants/types';
import { formattedNumber } from '../../hooks/functions';

type TransactionObject = {
  transactions: TransactionType[];
  totalCounts: number;
};

const TransactionSummary = ({
  transactions,
  totalCounts,
}: TransactionObject) => {
  const totalAmount = transactions?.reduce(
    (amt: number, transaction: TransactionType) => {
      const total = amt + parseFloat(transaction.amount);
      return total;
    },
    0
  );

  const totalCompleted = transactions?.filter(
    (transaction) => transaction.transaction_status === 'completed'
  ).length;

  return (
    // <div className="q-stat w-full flex justify-evenly items-center">
    //   <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
    //     <div className="flex gap-2 justify-center items-center">
    //       <div className="border-4 border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
    //       <div className="flex gap-2 justify-center items-center">
    //         <div className="text-white font-bold italic">Total Amount</div>
    //         <div className="text-white font-bold italic text-xl border px-2 rounded-lg items-center justify-center flex">
    //           #{totalAmount}
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
    //     <div className="flex gap-2 justify-center items-center">
    //       <div className="border-4 border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
    //       <div className="flex gap-2 justify-center items-center">
    //         <div className="text-white font-bold italic">
    //           Total transactions
    //         </div>
    //         <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
    //           {totalCounts}
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary ">
    //     <div className="flex gap-2 justify-center items-center">
    //       <div className="border-4 border-[#FFF7E7] h-5 w-5 rounded-full  bg-[#FFC453] p-2"></div>

    //       <div className="flex gap-2 justify-center items-center">
    //         <div className="text-white font-bold italic">
    //           Completed transactions
    //         </div>

    //         <div className="text-white font-bold italic text-xl border rounded-full h-[40px] w-[40px] items-center justify-center flex">
    //           {totalCompleted}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    ///////////////////////////////////////////////////////////////////

    <div className="mx-8 mlg:ml-20">
      <div className="q-stat w-[70%] flex flex-col lg:ml-0 slg:ml-0 mlg:ml-20  md:ml-[300px] lg:flex-row justify-evenly lg:items-center slg:items-center mlg:items-center min-w-[100%] gap-4 md:gap-0">
        <div className="lg:w-[33.3%] clg:w-[25%] slg:w-[30%] md:w-[60vw] h-[120px] flex flex-col gap-2 md:content-start md:ml-[-300px] lg:ml-0 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary">
          <div className="flex clg:flex-col gap-2 justify-center items-center ">
            <div className="border-4 clg:hidden border-[#FFF7E7] rounded-full bg-[#FFC453] p-2"></div>
            <div className="flex gap-2 justify-center items-center">
              <div className="text-white md:text-[12px] lg:text-[15px] font-bold italic">
                Total Amount
              </div>
              <div className="text-white font-bold italic text-xl md:text-[12px] border px-2 rounded-lg items-center justify-center flex">
                #{formattedNumber(totalAmount)}
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
                {totalCounts}
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
                {totalCompleted}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
