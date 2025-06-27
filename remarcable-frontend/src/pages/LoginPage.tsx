import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { login, logout } from '../redux/userSlice';
import type { RootState } from '../redux/store';
import { login as loginAPI} from '../api/loginAPI';
import { login } from '../redux/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    if (!username || !userId) return;

    const res = await loginAPI 
    console.log(res);

    // dispatch(login({ id: userId, name: username }));
    // navigate('/home'); 
  };

  return (
    <div className="login-page" style={{ padding: 20 }}>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label>
              User ID:
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </label>
          </div>
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
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;