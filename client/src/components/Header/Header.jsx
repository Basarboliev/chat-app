import { useState } from 'react';
import { LockFilled, UserOutlined, NotificationOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { ChatItem } from 'react-chat-elements';
import styles from './Header.module.css';

const Header = ({ title, onlineUsers, notifications }) => {
    const [onlineUsersDrawer, setOnlineUsersDrawer] = useState(false);
    const [notificationsDrawer, setNotificationsDrawer] = useState(false);

    const showOnlineUsersDrawer = () => {
        setOnlineUsersDrawer(true);
    };

    const onCloseOnlineUsersDrawer = () => {
        setOnlineUsersDrawer(false);
    }

    const showNotificationsDrawer = () => {
        setNotificationsDrawer(true);
    };

    const onCloseNotificationsDrawer = () => {
        setNotificationsDrawer(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}><LockFilled className={styles.icon} /> {title} <LockFilled className={styles.icon} /></div>
            <div className={styles.options}>
                <UserOutlined onClick={showOnlineUsersDrawer} />
                <NotificationOutlined onClick={showNotificationsDrawer}/>
            </div>

            <Drawer title="Online users: " placement="right" onClose={onCloseOnlineUsersDrawer} open={onlineUsersDrawer}>
                <ul className={styles.online}>
                    {
                        onlineUsers.map((user, index) => (
                            <li key={index} className={styles.user}>
                                <div className={styles.dot} />
                                {user}
                            </li>
                        ))
                    }
                </ul>
            </Drawer>

            <Drawer title="Notifications: " placement="right" onClose={onCloseNotificationsDrawer} open={notificationsDrawer}>
                <ul className={styles.notifications}>
                    {
                        notifications.map((notification, index) => (
                            <li key={index}>
                                <ChatItem
                                    avatar={notification.avatar}
                                    alt={notification.alt}
                                    title={notification.title}
                                    subtitle={notification.subtitle}
                                    date={notification.date}
                                />
                            </li>
                        ))
                    }
                </ul>
            </Drawer>
        </div>
    );
}

export default Header;