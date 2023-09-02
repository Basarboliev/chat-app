import { LockFilled, MenuOutlined } from '@ant-design/icons';
import styles from './Header.module.css';

const Header = ({title}) => {

    return (
        <div className={styles.container}>
            <div className={styles.title}><LockFilled className={styles.icon}/> {title} <LockFilled className={styles.icon}/></div>
        </div>
    );
}

export default Header;