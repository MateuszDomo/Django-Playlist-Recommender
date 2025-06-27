import { useState } from 'react';
import { SongsComponent } from './SongsComponent';
import { PlaylistComponent } from './PlaylistComponent';

type MusicPanelSelection = "songs" | "playlists"

export const MusicComponent = () => {
  const [selected, setSelected] = useState<MusicPanelSelection>('songs');

  return (
    <div style={{
        margin: '80px 20px',
        width:   'calc(100% - 40px)', 
        flex: 1,
        display: 'flex',     
        flexDirection: 'column', 
    }}>
      <div
        style={{
          backgroundColor: '#ddd',
          overflow: 'hidden',
          width: 'fit-content',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={() => setSelected('songs')}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: selected === 'songs' ? '#282c34' : 'transparent',
            color: selected === 'songs' ? 'white' : '#282c34',
            cursor: 'pointer',
            transition: '0.3s',
          }}
        >
          Songs
        </button>
        <button
          onClick={() => setSelected("playlists")}
          style={{
            padding: '10px 20px',
            border: 'none',
            backgroundColor: selected === 'playlists' ? '#282c34' : 'transparent',
            color: selected === 'playlists' ? 'white' : '#282c34',
            cursor: 'pointer',
            transition: '0.3s',
          }}
        >
          Playlists
        </button>
      </div>
      {selected === 'songs' ? <SongsComponent /> : <PlaylistComponent />}
    </div>
  );
};