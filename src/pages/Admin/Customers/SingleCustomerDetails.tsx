import { Link, useParams } from 'react-router-dom';
import { AdminState } from '../../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSingleCustomerForAdmin } from '../../../hooks/ApiCalls';
import { getSingleCustomerSuccess } from '../../../redux/adminSlice';
import { formattedNumber } from '../../../hooks/functions';

const SingleCustomerDetails = () => {
  const [loading, setLoading] = useState(true);

  const { customerId } = useParams();
  const dispatch = useDispatch();

  const { singleCustomerDetails } = useSelector(
    (state: { admin: AdminState }) => state.admin
  );

  console.log('customerId', customerId);
  console.log('singleCustomerDetails', singleCustomerDetails);

  const fetchSingleCustomerDetails = async () => {
    if (!customerId) {
      return null;
    }

    try {
      const response = await getSingleCustomerForAdmin(customerId);

      if (response.success === true) {
        dispatch(getSingleCustomerSuccess(response?.user));
        return;
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
    fetchSingleCustomerDetails();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center mt-16 gap-6">
          <p className="uppercase font-bold underline italic text-2xl">
            Owner Information
          </p>
          <div className="">
            <img
              className="w-32 h-32 rounded-full border border-primary"
              src={singleCustomerDetails?.user?.profile_image?.url}
              alt="user_profile_img"
            />
          </div>

          <div className="">
            <div className="flex gap-2">
              <p className="font-bold uppercase">fullname</p>
              <p>{`${singleCustomerDetails?.user?.first_name} ${singleCustomerDetails?.user?.last_name}`}</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold uppercase">Email:</p>
              <p>{singleCustomerDetails?.user?.email} </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-center uppercase font-bold underline text-2xl">
              Customer Accounts
            </p>

            <div className="overflow-auto px-3 w-[100%] mb-20">
              <div className="overflow-x-auto">
                <table className="table-auto min-w-full divide-y divide-gray-200 h-16 py-10">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="pr-1 w-1/7  md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Account Number
                      </th>
                      <th className="w-1/7 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Balance(#)
                      </th>

                      <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                        User ID
                      </th>

                      <th className="w-1/7 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6">
                          <Spinner />
                        </td>
                      </tr>
                    ) : singleCustomerDetails?.accounts?.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-6">
                          <div className="flex flex-col items-center">
                            <img src={'../../public/diamond1.jfif'} alt="" />
                            <p className="text-[#AB2638] font-extrabold text-[16px] ">
                              There are no accounts yet 😑
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      singleCustomerDetails?.accounts?.map(
                        (account, index: number) => (
                          <tr key={index} className="">
                            <td className="md:px-6 py-4 flex gap-2 whitespace-nowrap text-sm text-gray-500">
                              {account?.account_number}

                              {account?.is_default === true && (
                                <p className="uppercase">(pry)</p>
                              )}
                            </td>

                            <td className="md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formattedNumber(Number(account?.balance))}
                            </td>

                            {/* <td className="hidden md:px-6 py-4 whitespace-nowrap text-sm text-gray-500"> */}
                            <td className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base">
                              {`${account?.user_id.slice(
                                0,
                                5
                              )} ... ${account?.user_id.slice(30, 36)}`}
                            </td>

                            <td className="md:px-6 py-4 whitespace-nowrap text-sm text-blue-500 underline">
                              <Link
                                to={`/admin/account/${account?.user_id}/${account?.id}`}
                              >
                                view details
                              </Link>
                            </td>
                          </tr>
                        )
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCustomerDetails;
