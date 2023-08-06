import styles from './ContactParallax.module.css';

const ContactParallax = ({label}) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
        </div>
    );
}

export default ContactParallax;