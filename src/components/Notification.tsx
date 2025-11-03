import React, { useEffect, useState } from 'react';
import '../styles/Notification.css';

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isClosing, setIsClosing] = useState(false);

    const formatMessage = (msg: string) => {
        if (!msg) return msg;

        const duplicateMatch = msg.match(/Задача "(.+?)" уже существует в списке!/);
        if (duplicateMatch) {
            const taskTitle = duplicateMatch[1];
            const formattedTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1).toLowerCase();
            return (
                <>
                    Задача "{formattedTitle}" уже существует<br />
                    в списке!
                </>
            );
        }
        return msg.charAt(0).toUpperCase() + msg.slice(1);
    };

    const formattedMessage = formatMessage(message);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };

    useEffect(() => {
        const timer = setTimeout(handleClose, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <div
                className={`notification-overlay ${isClosing ? 'fade-out' : ''}`}
                onClick={handleClose}
            />

            <div
                className={`notification-content ${isClosing ? 'fade-out' : ''}`}
            >
                <div className="notification-message">
                    {formattedMessage}
                </div>

                <button
                    className="notification-button"
                    onClick={handleClose}
                >
                    Закрыть
                </button>
            </div>
        </>
    );
};

export default Notification;