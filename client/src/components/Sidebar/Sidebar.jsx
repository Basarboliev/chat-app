import styles from './Sidebar.module.css';

const Sidebar = ({children}) => {
    return (
        <aside className={styles.container}>
            {children}
        </aside>
    );  
}

export default Sidebar;