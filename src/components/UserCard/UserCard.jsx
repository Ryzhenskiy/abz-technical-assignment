import styles from './UserCard.module.scss';

const UserCard = ({ user }) => {
  return (
    <div className={styles.card}>
      <img src={user.photo} alt={user.name} />
      <h3 title={user.name}>{user.name}</h3>
      <p title={user.position}>{user.position}</p>
      <p title={user.email}>{user.email}</p>
      <p title={user.phone}>{user.phone}</p>
    </div>
  );
};
export default UserCard;
