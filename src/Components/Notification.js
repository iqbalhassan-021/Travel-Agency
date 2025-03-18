import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase'; // Adjust the import path based on your Firebase config file location

const Notification = ({ backgroundColor, Color }) => {
  // State to manage notification message
  const [notificationMessage, setNotificationMessage] = useState("Start Booking Now"); // Default fallback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch notifications from Firestore on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "notifications"));
        const notificationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort by createdAt (assuming timestamp field exists) and take the latest
        const latestNotification = notificationsData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        if (latestNotification && latestNotification.message) {
          setNotificationMessage(latestNotification.message);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications: ", err);
        setError('There is no notification to show.');
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="notification" style={{ backgroundColor }}>
      {loading ? (
        <p style={{ color: Color }}>Loading notification...</p>
      ) : error ? (
        <p style={{ color: Color }}>{error}</p>
      ) : (
        <p style={{ color: Color }}>
          {notificationMessage}
        </p>
      )}
    </div>
  );
};

export default Notification;