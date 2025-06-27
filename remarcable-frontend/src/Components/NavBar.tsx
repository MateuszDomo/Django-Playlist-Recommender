import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { logout } from '../redux/userSlice';

export const NavBar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav
      style={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>My App</h2>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {user && <span>Welcome, {user.username}</span>}
        { (
          <button
            onClick={handleLogout}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: 'red',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};