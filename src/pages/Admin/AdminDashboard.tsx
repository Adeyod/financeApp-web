import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAllAccountsSuccess,
  getAllCustomersSuccess,
  getAllTransactionsSuccess,
} from '../../redux/adminSlice';
import { AdminState, UserState } from '../../constants/types';
import ChartComponents from '../../components/charts/ChartComponents';
import { formatDate, formattedNumber } from '../../hooks/functions';
import { Link } from 'react-router-dom';
import useApi from '../../hooks/ApiCalls';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { getPlatformAccounts, getPlatformCustomers, getPlatformTransactions } =
    useApi();

  const { currentUser } = useSelector(
    (state: { user: UserState }) => state.user
  );

  const {
    allCustomers,
    allTransactions,
    allAccounts,
    allTransactionsTotalCount,
    allAccountsTotalCount,
    allCustomersTotalCount,
  } = useSelector((state: { admin: AdminState }) => state.admin);

  const [loading, setLoading] = useState(true);
  const page = '1';
  const limit = '10';
  const searchValue = '';

  const fetchAdminPanelInfo = async () => {
    try {
      const [accounts, transactions, customers] = await Promise.all([
        getPlatformAccounts(page, limit, searchValue),
        getPlatformTransactions(page, limit, searchValue),
        getPlatformCustomers(page, limit, searchValue),
      ]);

      if (
        accounts?.accounts &&
        transactions?.transactions &&
        customers?.customers
      ) {
        dispatch(getAllTransactionsSuccess(transactions.transactions));
        dispatch(getAllAccountsSuccess(accounts.accounts));
        dispatch(getAllCustomersSuccess(customers.customers));
      } else {
        throw new Error('One or more API responses are invalid');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminPanelInfo();
  }, []);

  const chartData = {
    labels: ['Transactions', 'Accounts', 'Customers'],
    datasets: [
      {
        label: 'Count',
        data: [
          allTransactionsTotalCount,
          allAccountsTotalCount,
          allCustomersTotalCount,
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
      },
    ],
  };

  const ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="bg-[#E4E4E4] max-w-[83%] lg:max-w-[95%] w-full flex flex-col lmg:flex-row md:flex-row md:text-[16px] lg:text-xl m-6 rounded-lg justify-between p-5">
            <div className="">
              Admin Panel
              <p>
                Welcome {currentUser?.first_name} {currentUser?.last_name}
              </p>
            </div>
            <div className="">
              <div className="flex gap-1">
                <p>Role:</p>
                <p>{currentUser?.role}</p>
              </div>
              <div className="flex gap-1">
                <p>Email</p>
                <p>{currentUser?.email}</p>
              </div>
            </div>
          </div>
          <div className="mt-16 flex mx-10 lg:flex-row clg:flex-row mg:flex-row clg:items-center cpg:items-center cpg:gap-10 gap-10 md:gap-10 flex-col space-x-14 items-stretch">
            <div className="max-w-[97%] lg:max-w-[50%] w-full h-full flex-1 flex flex-col justify-evenly bg-[#E4E4E4] text-text px-4 py-4 rounded shadow-xl">
              <div className="">
                <p className="text-2xl lg:text-4xl font-medium">Stats</p>
              </div>

              <div className="flex flex-col md:flex-row gap-5 text-[#111827]">
                <div className="flex-1 bg-white flex flex-col justify-between items-center text-center rounded py-4">
                  <p>{allTransactionsTotalCount}</p>
                  <p>Total Transactions</p>
                </div>
                <div className="flex-1 bg-white flex flex-col justify-between items-center text-center rounded py-4">
                  <p>{allAccountsTotalCount}</p>
                  <p>Total Accounts</p>
                </div>
                <div className="flex-1 bg-white flex flex-col justify-between items-center text-center rounded py-4">
                  <p>{allCustomersTotalCount}</p>
                  <p>Total Customers</p>
                </div>
              </div>
            </div>

            <div className="max-w-[90%] lg:max-w-[50%] h-full flex-1 flex gap-5  ">
              <div className=" w-[33%] flex-1 bg-[#E4E4E4] text-text ml-[-50px] px-4 py-4 rounded shadow-xl">
                <ChartComponents
                  type="doughnut"
                  data={chartData}
                  options={ChartOptions}
                />
              </div>
              <div className=" w-[33%] flex-1 bg-[#E4E4E4] text-text px-4 py-4 rounded shadow-xl">
                <ChartComponents
                  type="doughnut"
                  data={chartData}
                  options={ChartOptions}
                />
              </div>
              <div className=" w-[33%] flex-1 bg-[#E4E4E4] text-text px-4 py-4 rounded shadow-xl">
                <ChartComponents
                  type="doughnut"
                  data={chartData}
                  options={ChartOptions}
                />
              </div>
            </div>
          </div>

          <div>
            {/* SOME CUSTOMERS */}
            <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
              <p className="text-center uppercase mt-10 font-bold underline bg-gray-100">
                Customers
              </p>
              <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      First name
                    </th>

                    <th className="lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Last name
                    </th>
                    <th className="lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      User name
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <Spinner />
                      </td>
                    </tr>
                  ) : allCustomers?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        You have no transactions yet 😑
                      </td>
                    </tr>
                  ) : (
                    allCustomers?.slice(0, 5).map((customer, index) => (
                      <tr key={index}>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {customer?.first_name}
                        </td>

                        <td className="lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {customer?.last_name}
                        </td>
                        <td className=" lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {customer?.user_name}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Link
                className="text-end underline text-blue-500 mr-20"
                to="/admin/customers/all"
              >
                View All Customers
              </Link>
            </div>

            {/* SOME TRANSACTIONS */}
            <div className=" overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
              <p className="text-center uppercase mt-10 font-bold underline bg-gray-100">
                Transactions
              </p>

              <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Account number
                    </th>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Amount(#)
                    </th>
                    <th className="hidden mng:table-cell pl-2 md:pl-6 text-left py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                      Transaction date
                    </th>
                    <th className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Transaction type
                    </th>
                    <th className=" lg:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Transaction status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <Spinner />
                      </td>
                    </tr>
                  ) : allTransactions?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        You have no transactions yet 😑
                      </td>
                    </tr>
                  ) : (
                    allTransactions?.slice(0, 3).map((transaction, index) => (
                      <tr key={index}>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {transaction?.account_number}
                        </td>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {formattedNumber(Number(transaction?.amount))}
                        </td>
                        <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {formatDate(new Date(transaction?.transaction_date))}
                        </td>
                        <td className="hidden lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {transaction?.transaction_type}
                        </td>
                        <td className=" lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {transaction?.transaction_status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Link
                className="text-end underline text-blue-500 mr-20"
                to="/admin/transactions/all"
              >
                View All Transactions
              </Link>
            </div>

            {/* SOME ACCOUNTS */}
            <div className="mb-20 overflow-x-auto w-[100%] md:w-full flex flex-col mx-auto smn:ml-[-1px]">
              <p className="text-center uppercase mt-10 font-bold underline bg-gray-100">
                Accounts
              </p>
              <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Account number
                    </th>
                    <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      Balance(#)
                    </th>
                    <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                      User ID
                    </th>
                    <th className=" mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-left text-sm md:text-[13px] lg:text-base">
                      Created date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <Spinner />
                      </td>
                    </tr>
                  ) : allAccounts?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-6">
                        You have no transactions yet 😑
                      </td>
                    </tr>
                  ) : (
                    allAccounts?.slice(0, 3).map((account, index) => (
                      <tr key={index}>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {account?.account_number}
                        </td>
                        <td className="pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {formattedNumber(Number(account?.balance))}
                        </td>
                        <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {account?.user_id}
                        </td>
                        <td className=" lg:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base">
                          {formatDate(new Date(account?.created_at))}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <Link
                className="text-end underline text-blue-500 mr-20 mb-10"
                to="/admin/accounts/all"
              >
                View All Accounts
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
