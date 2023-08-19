import NiceAvatar, { genConfig } from 'react-nice-avatar';
import { characters } from './config';
import styles from './Avatar.module.css';

const Avatar = ({ character = 0, hoverOff = false, onAvatarClick }) => {
     //If the character is greater or equal to characters.length, then genConfig will generate a random character...
    return (
        <div className={styles.avatar} onClick={onAvatarClick}>
            <NiceAvatar className={styles.character} {...genConfig(characters[character])} />
        </div>
    );
}

export default Avatar;