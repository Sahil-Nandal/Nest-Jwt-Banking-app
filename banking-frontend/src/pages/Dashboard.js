import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/authApi';
import axios from 'axios';

const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/auth/me', { withCredentials: true });
//         setUser(response.data);
//       } catch (err) {
//         setError('Failed to fetch user details. Please log in again.');
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/'); // Redirect to login after logout
//   };

  return (
    <div>
      <h2>Dashboard</h2>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>}
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div> */}
      
        <p>Loading user details...</p>
      
    </div>
  );
};

export default Dashboard;
