import styles from './Messages.module.css';

const Messages = ({children}) => {
    return (
        <div className={styles.messages}>
            {children}
        </div>
    );
}

export default Messages;