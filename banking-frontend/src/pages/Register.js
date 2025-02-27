import { useState } from 'react';
import { register } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import "./Register.css"

const Register = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Registration Successful");
      navigate('/'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Registration failed. Try again.', err);
    }
  };

  return (
    <div className='registerDiv'>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <h2 className="logo AppHeading">NestJs banking Application</h2>
      <h2 className="logo">Register</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="login"  type="submit">Register</button>
        <p>Already have an account?</p>
      <button className="create-account" onClick={() => navigate('/')}>Login</button>
      </form>
      
    </div>
  );
};

export default Register;
