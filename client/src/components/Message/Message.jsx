import styles from './Message.module.css';
import Avatar from '../Avatar/Avatar';
import LikeButton from '../LikeButton/LikeButton';
import { UserOutlined } from '@ant-design/icons';
import NiceAvatar, { genConfig } from 'react-nice-avatar';


const Message = ({ sender, message, time, avatar, numberOfLikes, onClickLikeButton, heartColor, position = "left" }) => {
    let container = position === "left" ? styles.left : styles.right;

    return (
        <div className={container}>
            <div className={styles.message}>
                <NiceAvatar className={styles.avatar} {...genConfig(avatar)} />

                <div className={styles.content}>
                    <div className={styles.header}>
                        <span className={styles.sender}>
                           <UserOutlined /> {sender}
                        </span>
                        <span className={styles.time}>
                            {time}
                        </span>
                    </div>
                    <div className={styles.text}>
                        {message}
                    </div>
                    <div className={styles.controls}>
                        <LikeButton numberOfLikes={numberOfLikes} onClick={onClickLikeButton} heartColor={heartColor}/>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Message;