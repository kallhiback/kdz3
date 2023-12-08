import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { API } from '../api/Api';

function UserProfilePage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [tabParams, setTabParams] = useSearchParams('?tab=posts');
  const [userMiscData, setUserMiscData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await API.get(`users/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, [id]);

  useEffect(() => {
    async function fetchUserMiscData(isPosts) {
      try {
        const updatedSearchParams = new URLSearchParams(tabParams);
        if (isPosts) {
          updatedSearchParams.set('tab', 'posts');
        } else {
          updatedSearchParams.set('tab', 'todos');
        }
        setTabParams(updatedSearchParams);

        const response = await API.get(`users/${id}/${updatedSearchParams.get('tab')}`);
        const data = response.data;
        isPosts ? setUserMiscData(data.posts) : setUserMiscData(data.todos);
      } catch (error) {
        console.error('Error', error);
      }
    }

    fetchUserMiscData(tabParams.get('tab') === 'posts');
  }, [tabParams, id, setTabParams]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Name: {userData.firstName} {userData.lastName}</h2>
          <div>
            <button onClick={() => setTabParams('tab', 'posts')}>Posts</button>
            <button onClick={() => setTabParams('tab', 'todos')}>Todos</button>
          </div>
          <div>
            {userMiscData.map(item => (
              <p key={item.id}>{tabParams.get('tab') === 'posts' ? item.title : item.todo}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfilePage;