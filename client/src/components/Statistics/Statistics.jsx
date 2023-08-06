import styles from './Statistics.module.css';
import Data from '../StatisticalData/Data';

const Statistics = () => {
    return (
        <div className={styles.container}>
            <Data statisticalData={{value: 145, label: 'Happy users'}} animationDuration={3}/> 
            <Data statisticalData={{value: 180, label: 'Channels created'}} animationDuration={5}/> 
            <Data statisticalData={{value: 8, label: 'Partners'}} animationDuration={2}/> 
        </div>
    );
}

export default Statistics;