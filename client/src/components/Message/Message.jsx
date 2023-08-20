

import styles from './Message.module.css';
import Avatar from '../Avatar/Avatar';
import LikeButton from '../LikeButton/LikeButton';


const Message = ({ sender, message, time, avatar, numberOfLikes, onClickLikeButton, heartColor }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Avatar character={avatar} />
                <span className={styles.sender}>{sender}</span>
            </div>
            <p className={styles.message}>{message}</p>
            <div className={styles.footer}>
                <span className={styles.time}>{time}</span>
                <LikeButton numberOfLikes={numberOfLikes} heartColor={heartColor} onClick={onClickLikeButton}/>
            </div>
        </div>
    );
}

export default Message;