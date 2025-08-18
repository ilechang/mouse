







import React, { useState } from "react";

const profiles = {
  standard: "./standardprofile.png",
  photoshop: "./psprofile.png",
  vscode: "./vscodeprofile.png",
  dota2: "./dota2profile.png",
  lol: "./lolprofile.png",
};

const profileOptions = [
  { key: "standard", label: "Standard" },
  { key: "photoshop", label: "Photoshop" },
  { key: "Rhino", label: "Rhino" },
  { key: "vscode", label: "VS Code" },
  { key: "dota2", label: "Dota 2" },
  { key: "lol", label: "LoL" },
  { key: "CS2", label: "CS2" },
];

export default function MouseProfile({ hoveredProfile, committedProfile }) {
  const displayProfile = hoveredProfile || committedProfile;

  return (
    <div
      className="min-vh-100 text-white d-flex flex-column align-items-center px-3 py-5"
      style={{ backgroundColor: "rgb(31,31,31)" }}
    >
      <h1 className="display-6 fw-bold mb-3">Automatic Profile Switching</h1>
      <p
        className="text-secondary text-center mb-4"
        style={{ maxWidth: "600px" }}
      >
        Seamlessly adapts to every app or game, with optimized experience on
        multi-monitor setups.
      </p>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "90%" }}
      >
        <img
          src={profiles[displayProfile]}
          alt={displayProfile}
          className="img-fluid"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4 mt-4">
        {profileOptions.map(({ key, label }) => {
          const isActive = displayProfile === key;
          return (
            <button
              key={key}
              className={`btn btn-sm px-4 py-2 mx-2 ${
                isActive ? "text-dark" : "btn-outline-light"
              }`}
              style={{
                backgroundColor: isActive ? "#fff" : "transparent",
                borderColor: "#fff",
                color: isActive ? "black" : "#fff",
                boxShadow: isActive
                  ? "0 0 30px rgba(0, 123, 255)"
                  : "none",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
