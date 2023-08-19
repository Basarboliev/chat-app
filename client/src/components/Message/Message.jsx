import styles from './Message.module.css';
import Avatar from '../Avatar/Avatar';

const Message = ({sender, message, time, avatar}) => {
    return (
        <div className={styles.container}>
            {/*<div className={styles.sender}>{sender}</div>*/}
            <Avatar character={avatar}/>
            <p className={styles.message}>{message}</p>
            <span className={styles.time}>{time}</span>
            <span className={styles.support} title='Click here for connection with our admin'>support</span>
        </div>
    );
}

export default Message;