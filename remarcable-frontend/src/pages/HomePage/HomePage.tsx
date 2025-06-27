import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { NavBar } from "../../Components/NavBar";
import { MusicComponent } from "./Components/MusicComponent";

export const HomePage = () => {

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
     }}>
      <NavBar/>
      <div style={{ padding: '0px', flex: 1, display: 'flex', flexDirection: 'column', marginTop: '0px' }}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
          <MusicComponent />
        </div>
        {/* <h1>Home Page</h1>
        <p>This is your protected home page.</p> */}
      </div>
    </div>
  );
};