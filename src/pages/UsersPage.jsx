import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../api/Api';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await API.get('users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <Link to={`users/${user.id}`}>{user.firstName} {user.lastName}</Link>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;
