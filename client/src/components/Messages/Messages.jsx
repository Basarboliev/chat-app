import styles from './Messages.module.css';
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ children }) => {
    return (
        <ScrollToBottom className={styles.messages}>
            {children}
        </ScrollToBottom>
    );
}

export default Messages;