import styles from './CustomInput.module.scss';

export const CustomInput = ({
  label,
  helperText,
  errorText,
  error = false,
  value,
  ...props
}) => {
  return (
    <div
      className={`${styles.wrapper} ${error ? styles.error : ''} ${
        value ? styles.filled : ''
      }`}
    >
      <div className={styles.inputWrapper}>
        <input {...props} value={value} className={styles.input} />
        {label && <label htmlFor={props.id}>{label}</label>}
      </div>
      {error ? (
        <span className={styles.errorText}>{errorText}</span>
      ) : (
        helperText && <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};
