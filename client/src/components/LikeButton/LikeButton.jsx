import { HeartFilled } from '@ant-design/icons';
import styles from './LikeButton.module.css';
import { Button, Popover, Space } from 'antd';


const LikeButton = ({ onClick, numberOfLikes, heartColor, usersLikedTheMessage }) => {
    const content = (
        <ul className={styles.likes}>
            {
                usersLikedTheMessage.map((user, index) => (
                    <li key={index}>
                        {user}
                    </li>
                ))
            }
        </ul>
    );

    return (
        <div className={styles.wrapper}>
            <HeartFilled onClick={onClick} style={{ color: heartColor }} />
            <Popover content={content} title="Title" trigger="click">
                <span className={styles.numberOfLikes}>{numberOfLikes}</span>
            </Popover>
        </div>
    )
}

export default LikeButton;