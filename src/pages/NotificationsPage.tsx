import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationState } from '../constants/types';
import { getNotificationsSuccess } from '../redux/notificationSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loginFailure } from '../redux/userSlice';
import useDebounce from '../hooks/UseDebounce';
import Search from '../components/Search';
import { formatDate, truncateText } from '../hooks/functions';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaTrashCan } from 'react-icons/fa6';
import { MdArchive } from 'react-icons/md';
import { VscMailRead } from 'react-icons/vsc';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import { RiCheckboxMultipleFill } from 'react-icons/ri';
import useApi from '../hooks/ApiCalls';

const NotificationsPage = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const dispatch = useDispatch();
  const {
    deleteManyNotifications,
    deleteNotification,
    getNotifications,
    markNotificationsAsViewed,
  } = useApi();

  const { userNotifications, totalNotificationsCount } = useSelector(
    (state: { notifications: NotificationState }) => state.notifications
  );

  const handleIsSelected = (id: number) => {
    setSelectedNotifications((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((i) => i !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const queryParams = new URLSearchParams(location.search);
  const pageParam = queryParams.get('page');
  const limitParam = queryParams.get('limit');
  const searchParam = queryParams.get('search');

  const [searchValue, setSearchValue] = useState(searchParam || '');
  const [page, setPage] = useState(Number(pageParam) || 1);
  const limit = limitParam || '10';

  const totalPages = Math.ceil(totalNotificationsCount / Number(limit));

  const fetchNotificationsAndMarkAsViewed = async (searchValue: string) => {
    try {
      const response = await markNotificationsAsViewed();
      console.log(response);
      if (response) {
        const result = await getNotifications(
          page.toString(),
          limit,
          searchValue
        );

        dispatch(getNotificationsSuccess(result?.notifications));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(loginFailure(error));
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setLoading(false);
    }
  };

  const getAllNotifications = async (searchValue: string) => {
    try {
      setIsLoading(true);
      const response = await getNotifications(
        page.toString(),
        limit,
        searchValue
      );
      dispatch(getNotificationsSuccess(response?.notifications));
      return;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(loginFailure(error));
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (notificationId?: number) => {
    try {
      if (notificationId) {
        const response = await deleteNotification(notificationId);
        if (response.success === true) {
          getAllNotifications(searchValue);
        }
        toast.success(response.message);
      } else {
        if (!selectedNotifications) {
          console.log('i am being called', selectedNotifications);
          return null;
        }

        if (selectedNotifications.length > 0) {
          const response = await deleteManyNotifications(selectedNotifications);
          console.log(response);
          if (response.success === true) {
            getAllNotifications(searchValue);
          }
          toast.success(response.message);
          setSelectedNotifications([]);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
        dispatch(loginFailure(error));
      } else {
        console.error('An error occurred:', error);
        toast.error('An error occurred:');
      }
    }
    // const response = await deleteNotification;
  };

  const debouncedSearchValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    fetchNotificationsAndMarkAsViewed(searchValue);
  }, []);

  useEffect(() => {
    if (debouncedSearchValue || page) {
      getAllNotifications(debouncedSearchValue);
    }
  }, [debouncedSearchValue, page]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.set('page', page.toString());
    queryParams.set('limit', limit.toString());
    console.log('I am running');

    if (searchValue) {
      queryParams.set('search', searchValue);
    }

    console.log('Updated URL Params:', queryParams.toString());

    window.history.replaceState(
      {},
      '',
      `${location.pathname}?${queryParams.toString()}`
    );

    fetchNotificationsAndMarkAsViewed(searchValue);
  }, [page, location.pathname, limit, searchValue]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mt-20 mb-10 flex justify-center">
            <Search
              searchValue={searchValue}
              handleKeyPress={(e) =>
                e.key === 'Enter' && getAllNotifications(searchValue)
              }
              setSearchValue={setSearchValue}
            />
          </div>
          <div className="mt-[-15px] overflow-x-auto w-[100%] px-16 md:w-full flex flex-col mx-auto smn:ml-[-1px]">
            <div
              className={[
                selectedNotifications.length > 0 ? 'flex' : 'hidden',
                'items-center gap-5 rounded-lg bg-gray-300 p-3 mb-3',
              ].join(' ')}
            >
              <button
                onClick={() => handleDelete()}
                className="uppercase text-2xl"
              >
                <FaTrashCan />
              </button>
              <button className="uppercase text-2xl">
                <MdArchive />
              </button>
              <button className="uppercase text-2xl">
                <VscMailRead />
              </button>
            </div>
            <p className="text-center uppercase mb-4 font-bold text-2xl underline">
              My Notifications
            </p>
            <table className="md:table-auto w-full min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base w-[5%]">
                    <RiCheckboxMultipleFill />
                  </th>
                  <th className="py-2 pl-5 md:py-3 text-left text-sm md:text-[13px] lg:text-base w-[30%]">
                    Title
                  </th>
                  <th className="pl-2 md:pl-6 py-2 md:py-3 text-left text-sm md:text-[13px] lg:text-base w-[40%]">
                    Message
                  </th>
                  <th className="hidden text-start mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[15%]">
                    Created At
                  </th>
                  <th className="hidden mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[10%]">
                    <AiOutlineDelete />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <Spinner />
                    </td>
                  </tr>
                ) : userNotifications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      You have no notifications yet 😑
                    </td>
                  </tr>
                ) : (
                  userNotifications.map((notification) => (
                    <tr
                      className={[
                        notification?.is_read === false
                          ? 'font-extrabold'
                          : 'font-normal',
                        '',
                      ].join(' ')}
                      key={notification.id}
                    >
                      <td className="py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[5%]">
                        <button
                          onClick={() => handleIsSelected(notification.id)}
                          className="text-center"
                        >
                          {selectedNotifications.includes(notification.id) ? (
                            <MdOutlineCheckBox />
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank />
                          )}
                        </button>
                      </td>

                      <td className="pl-2 md:pl-6 max-w-[30%] py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[30%]">
                        <Link
                          className="max-w-[30%] text-green-950"
                          to={`/notification/${notification?.id}`}
                        >
                          {truncateText(notification?.title, 25)}
                        </Link>
                      </td>

                      <td className="pl-2 md:pl-6 max-w-[50%] py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[40%]">
                        <Link to={`/notification/${notification?.id}`}>
                          {truncateText(notification?.message, 40)}
                        </Link>
                      </td>

                      <td className="hidden max-w-[20%] mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[20%]">
                        {formatDate(new Date(notification?.created_at))}
                      </td>

                      <td className="hidden max-w-[5%] mng:table-cell pl-2 md:pl-6 py-2 md:py-4 text-sm md:text-[13px] lg:text-base w-[5%]">
                        <button
                          onClick={() => handleDelete(notification?.id)}
                          className="text-center"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mb-56 flex justify-between items-center w-full px-4 mt-5">
            <div className="flex gap-4">
              {page > 1 && (
                <button
                  className="bg-primary p-2 rounded-lg font-bold text-white"
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
              )}
              {page < totalPages && (
                <button
                  className="bg-primary p-2 rounded-lg font-bold text-white"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              )}
            </div>
            <div>
              Page {page} of {totalPages}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationsPage;
