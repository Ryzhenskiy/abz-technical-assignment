import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import styles from './Users.module.scss';
import '../../styles/base.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
      );

      console.log('Fetched users:', res.data.users);
      setUsers((prev) => [...prev, ...res.data.users]);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <section className={styles.users}>
      <div className="container">
        <h2>Working with GET request</h2>

        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {page < totalPages && (
          <button className="btn" onClick={() => setPage((prev) => prev + 1)}>
            Show more
          </button>
        )}
      </div>
    </section>
  );
};

export default Users;
