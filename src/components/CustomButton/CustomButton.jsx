import styles from './CustomButton.module.scss';

const CustomButton = ({ disabled, children, onClick, type }) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default CustomButton;
