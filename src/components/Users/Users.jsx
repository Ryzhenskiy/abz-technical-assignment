import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import styles from './Users.module.scss';
import CustomButton from '../CustomButton/CustomButton';
import Heading from '../Heading/Heading';
import '../../styles/base.scss';

const Users = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNumber = 1, reset = false) => {
    try {
      const res = await axios.get(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pageNumber}&count=6`
      );
      if (reset) {
        setUsers(res.data.users);
      } else {
        setUsers((prev) => [...prev, ...res.data.users]);
      }
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchUsers(1, true);
  }, [refreshTrigger]);

  return (
    <section className={styles.users}>
      <div className="container">
        <Heading>Working with GET request</Heading>

        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {page < totalPages && (
          <CustomButton onClick={() => setPage((prev) => prev + 1)}>
            Show more
          </CustomButton>
        )}
      </div>
    </section>
  );
};

export default Users;
