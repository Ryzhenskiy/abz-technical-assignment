import styles from './Text.module.scss';

const Text = ({ children, className }) => {
  return <p className={`${styles.text} ${className}`}>{children}</p>;
};

export default Text;
