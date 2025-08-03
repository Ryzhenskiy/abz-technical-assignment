import styles from './Logo.module.scss';
import LogoImage from '../../assets/LogoImage';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <LogoImage />
      <div>TESTTASK</div>
    </div>
  );
};
