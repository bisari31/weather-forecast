import { RotatingLines } from 'react-loader-spinner';
import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='96' visible />
      </div>
    </div>
  );
};
export default Spinner;
