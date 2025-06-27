import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../redux/store';
import { loginAPI, type LoginResponse} from '../api/LoginAPI';
import { login } from '../redux/userSlice';
import type { User } from '../models/User';
import { useApiClient } from '../hooks/useAPIClient';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const api = useApiClient();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state: RootState) => state.user)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;
    try {
      const res: LoginResponse = await loginAPI(api, username, password)
      dispatch(login({ user: res.user, token: res.token }));
      navigate('/'); 
    } catch (e: any) {}
  };

  return (
    <div className="login-page" style={{ padding: 20 }}>
        <form>
          <h2>Login</h2>
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
            <button onClick={handleLogin}>Submit</button>{' '}
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </form>
    </div>
  );
};
