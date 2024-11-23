import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loginFailure } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { markANotificationAsRead } from '../hooks/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleNotificationSuccess } from '../redux/notificationSlice';
import { NotificationState } from '../constants/types';

const NotificationDetails = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { notificationId } = useParams();

  const { singleUserNotification } = useSelector(
    (state: { notifications: NotificationState }) => state.notifications
  );

  console.log('singleUserNotification', singleUserNotification);

  const markNotificationsAsRead = async () => {
    if (!notificationId) {
      return;
    }
    try {
      const response = await markANotificationAsRead(notificationId);
      console.log('response', response.notification);
      dispatch(getSingleNotificationSuccess(response?.notification));
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

  useEffect(() => {
    markNotificationsAsRead();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-lg font-bold mb-4 mt-[-200px]">
            Notification Details
          </p>
          <p className="mb-6">
            <span className="uppercase font-bold">Title: </span>
            <span>{singleUserNotification?.title}</span>
          </p>
          <div className="w-[50%] bg-gray-100 p-6 rounded-md shadow-md text-center">
            <p className="text-base">{singleUserNotification?.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationDetails;
