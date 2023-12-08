import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<UsersPage />} />
          <Route path="users/:id" element={<UserProfilePage />} />
        </Route>
      </Routes>
  );
}

export default App;
