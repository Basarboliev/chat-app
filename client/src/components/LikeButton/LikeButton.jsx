import { HeartFilled } from '@ant-design/icons';
import styles from './LikeButton.module.css';


const LikeButton = ({ onClick, numberOfLikes, heartColor }) => {
    return (
        <div className={styles.wrapper}>
            <HeartFilled onClick={onClick} style={{color: heartColor}}/>
            <span className={styles.numberOfLikes}>{numberOfLikes}</span>
        </div>
    )
}

export default LikeButton;