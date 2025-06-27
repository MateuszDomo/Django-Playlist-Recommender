import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../api/RegisterAPI';
import { useApiClient } from '../hooks/useAPIClient';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const api = useApiClient();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;
    try {
      await registerAPI(api, username, password);
      navigate('/login'); 
    } catch (e: any) {}
  };

  return (
    <div className="register-page" style={{ padding: 20 }}>
        <form>
          <h2>Register</h2>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password: 
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
 
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={handleRegister}>Register</button>{' '}
          </div>
        </form>
    </div>
  );
};