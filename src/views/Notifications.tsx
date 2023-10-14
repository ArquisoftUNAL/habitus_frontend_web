import { useEffect, useState } from 'react';
import { USER_NOTIFICATIONS } from "../graphql/Queries";
import { useQuery } from "@apollo/client";

interface Notification {
  noti_title: string;
  noti_body: string;
  noti_should_email: boolean;
  noti_init_date: string;
}

function Notifications() {
  const { data, loading, error } = useQuery(USER_NOTIFICATIONS);

  useEffect(() => {
    // Puedes agregar lógica adicional aquí si es necesario.
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const notifications: Notification[] = data?.getNotificationsUser || [];

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <strong>Title:</strong> {notification.noti_title}<br />
            <strong>Body:</strong> {notification.noti_body}<br />
            <strong>Send Email:</strong> {notification.noti_should_email ? "Sí" : "No"}<br />
            <strong>Init Date:</strong> {notification.noti_init_date}
          </li>
        ))}
      </ul>
      <h2>Bottom</h2>
    </div>
  );
}

export default Notifications;