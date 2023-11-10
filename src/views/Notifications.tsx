import { useEffect } from 'react';
import { USER_NOTIFICATIONS } from "../graphql/Queries";
import { useQuery } from "@apollo/client";
import '../styles/Notifications.css';
import { NavBar } from "../components/NavBar";
import LoadingView from './LoadingView';

import "./../styles/GeneralStyles.css"

interface Notification {
  noti_title: string;
  noti_body: string;
  noti_should_email: boolean;
  noti_init_date: string;
}

function Notifications() {
  const { data, loading, error } = useQuery(USER_NOTIFICATIONS);

  useEffect(() => {
  }, []);

  if (loading) return <LoadingView />;
  if (error) return <p>Error: {error.message}</p>;

  const notifications: Notification[] = data?.getNotificationsUser || [];

  function formatDateToCustomString(dateString: string) {
    const formattedDate = new Date(dateString);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    const hours = String(formattedDate.getHours()).padStart(2, '0');
    const minutes = String(formattedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  return (
    <div>
      <NavBar />
      <ul className="row text-center notification-list">
        <div className="col-12 habitus-page-title habitus-with-bottomline">
          Notifications
        </div>
        <div className="habitus-separator"></div>
        {notifications.map((notification, index) => (
          <li key={index} className="col-12 col-sm-4 notification-item">
            <strong>Title:</strong> {notification.noti_title}<br />
            <strong>Body:</strong> {notification.noti_body}<br />
            <strong>Send Email:</strong> {notification.noti_should_email ? "Yes" : "No"}<br />
            <strong>Init Date:</strong> {formatDateToCustomString(notification.noti_init_date)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
