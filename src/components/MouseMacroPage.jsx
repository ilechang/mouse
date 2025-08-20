







import React, { useState } from "react";

const profiles = {
  lol: "./lolprofile-min.webp",
  photoshop: "./psprofile-min.webp",
  vscode: "./vscodeprofile-min.webp",
};

const profileOptions = [
  { key: "lol", label: "LoL" },
  { key: "photoshop", label: "Photoshop" },
  { key: "dota2", label: "Dota 2" },
  { key: "CS2", label: "CS2" },
  { key: "Rhino", label: "Rhino" },
  { key: "vscode", label: "VS Code" },

];

export default function MouseProfile({ hoveredProfile, committedProfile }) {
  const displayProfile = hoveredProfile || committedProfile;

  return (
    <div
      className="min-vh-100 text-white d-flex flex-column align-items-center px-3 py-5"
      style={{ backgroundColor: "rgb(31,31,31)" }}
    >
      <h1 className="display-6 fw-bold mb-3 mt-5">Software/game specific profile</h1>
      <p
        className="text-white text-center mb-4"
        style={{ maxWidth: "1000px" }}
      >
        Whether you’re working or gaming, create tailored profiles with custom keys and shortcuts — boosting productivity and delivering an immersive experience that’s uniquely yours.
      </p>

      <div
        className="my-5 d-flex justify-content-center align-items-center"
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

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-0 mt-4 
      ">
        {profileOptions.map(({ key, label }) => {
          const isActive = displayProfile === key;
          return (
            <button
              key={key}
              className={`btn btn-sm px-4 py-2 mx-2 ${isActive ? "text-dark" : "btn-outline-light"
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
