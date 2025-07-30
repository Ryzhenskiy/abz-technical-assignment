import styles from './Header.module.scss';
import Logo from '../../assets/Logo'; // Assuming you have a logo component or SVG
import '../../styles/base.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <div className={styles.logo}>
          <Logo />
          <div>TESTTASK</div>
        </div>

        <div className={styles.buttons}>
          <button className="btn">Users</button>
          <button className="btn">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
