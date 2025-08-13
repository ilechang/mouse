
import React, { useState } from 'react';

const profiles = {
  'VS Code': {
    'Left Mouse Click': 'Select',
    'Right Mouse Click': 'Context Menu',
    'Scroll Click': 'Open Link',
    'Scroll Up': 'Scroll Up',
    'Scroll Down': 'Scroll Down',
    'Scroll Left': 'Switch Tab Left',
    'Scroll Right': 'Switch Tab Right',
    'Start/Stop Video': 'Toggle Terminal',
    'Mute/Unmute': 'Command Palette',
    'Share Screen': 'Search Files',
    'Disable 1': 'Disable',
    'Disable 2': 'Disable',
  },
  'Photoshop': {
    'Left Mouse Click': 'Brush',
    'Right Mouse Click': 'Eyedropper',
    'Scroll Click': 'Hand Tool',
    'Scroll Up': 'Zoom In',
    'Scroll Down': 'Zoom Out',
    'Scroll Left': 'Undo',
    'Scroll Right': 'Redo',
    'Start/Stop Video': 'New Layer',
    'Mute/Unmute': 'Toggle Panels',
    'Share Screen': 'Fit on Screen',
    'Disable 1': 'Disable',
    'Disable 2': 'Disable',
  },
  'Rhino': {
    'Left Mouse Click': 'Select',
    'Right Mouse Click': 'Repeat Last Command',
    'Scroll Click': 'Pan',
    'Scroll Up': 'Zoom In',
    'Scroll Down': 'Zoom Out',
    'Scroll Left': 'Rotate View Left',
    'Scroll Right': 'Rotate View Right',
    'Start/Stop Video': 'Set View',
    'Mute/Unmute': 'Snap Toggle',
    'Share Screen': 'Perspective Mode',
    'Disable 1': 'Disable',
    'Disable 2': 'Disable',
  },
  'Valorant': {
    'Left Mouse Click': 'Primary Fire',
    'Right Mouse Click': 'Aim Down Sight',
    'Scroll Click': 'Open Map',
    'Scroll Up': 'Next Weapon',
    'Scroll Down': 'Melee',
    'Scroll Left': 'Use Ability Q',
    'Scroll Right': 'Use Ability E',
    'Start/Stop Video': 'Use Ability C',
    'Mute/Unmute': 'Ultimate (X)',
    'Share Screen': 'Ping / Voice Wheel',
    'Disable 1': 'Disable',
    'Disable 2': 'Disable',
  },
  'THE FINALS': {
    'Left Mouse Click': 'Shoot',
    'Right Mouse Click': 'Throw Grenade',
    'Scroll Click': 'Equip Skill',
    'Scroll Up': 'Switch to Main Weapon',
    'Scroll Down': 'Switch to Tool',
    'Scroll Left': 'Grapple / Dash',
    'Scroll Right': 'Interact / Revive',
    'Start/Stop Video': 'Use Healing Item',
    'Mute/Unmute': 'Voice Chat',
    'Share Screen': 'Ping Enemy',
    'Disable 1': 'Disable',
    'Disable 2': 'Disable',
  },
};

export default function MouseProfile() {
  const [currentProfile, setCurrentProfile] = useState('VS Code');
  const bindings = profiles[currentProfile];

  return (
    <div className="min-vh-100  text-white d-flex flex-column align-items-center px-3 py-5" style={{backgroundColor:"rgb(31,31,31)"}}>
      <h1 className="display-6 fw-bold mb-3">Automatic Profile Switching </h1>
      <p className="text-secondary text-center mb-4" style={{ maxWidth: '600px' }}>
      Seamlessly adapts to every app or game, with optimized experience on multi-monitor setups.
      </p>



      {/* Mouse and Labels */}
      <div className="position-relative" style={{ width: '400px', height: '500px' }}>
        <img
          src="/top.png"
          alt="Mouse"
          className="img-fluid h-100 w-100 object-fit-contain"
          style={{ objectFit: 'contain' }}
        />

        {Object.entries(bindings).map(([label, value], index) => {
          const isLeft = index < 6;
          const topOffset = 20 + index * 35;

          return (
            <div
              key={label}
              className={`position-absolute ${isLeft ? 'text-start' : 'text-end'}`}
              style={{
                top: `${topOffset}px`,
                left: isLeft ? '-180px' : 'auto',
                right: isLeft ? 'auto' : '-180px',
              }}
            >
              <div className="fw-semibold text-success">{label}</div>
              <div className="small text-secondary">{value}</div>
            </div>
          );
        })}
      </div>

            {/* Profile Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {Object.keys(profiles).map((profile) => (
          <button
            key={profile}
            className={`btn btn-sm ${
              currentProfile === profile ? 'btn-success text-dark' : 'btn-outline-light'
            }`}
            onClick={() => setCurrentProfile(profile)}
          >
            {profile}
          </button>
        ))}
      </div>
      
    </div>
  );
}
