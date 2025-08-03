import styles from './Header.module.scss';
import { Logo } from '../Logo/Logo';
import '../../styles/base.scss';
import CustomButton from '../CustomButton/CustomButton';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <Logo />
        <div className={styles.buttons}>
          <CustomButton>Users</CustomButton>
          <CustomButton>Sign up</CustomButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
