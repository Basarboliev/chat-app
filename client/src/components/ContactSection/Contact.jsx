import styles from './Contact.module.css';
import { HomeFilled, MailFilled, PhoneFilled } from '@ant-design/icons';

const Contact = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}> WHERE I WORK </h1>
            <p className={styles.feedback}>I'd love your feedback!</p>

            <div className={styles.infoSection}>
                <img className={styles.image} src='https://www.w3schools.com/w3images/map.jpg' alt='Workplace' />
                <div className={styles.additionalInfo}>
                    <div className={styles.info}>
                        <span className={styles.icon}><HomeFilled /></span>
                        <span className={styles.label}> Rousse, BG </span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.icon}><PhoneFilled /></span>
                        <span className={styles.label}> +359 884 321 878 </span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.icon}><MailFilled /></span>
                        <span className={styles.label}> mad.of.gravity@gmail.com </span>
                    </div>
                    <div className={styles.note}>
                        Swing by for a cup of ☕, or write to me in the channel: <span className={styles.support}>support</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Contact;