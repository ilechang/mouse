// import React, { useEffect, useRef, useState } from "react";
// import { Card, Form } from "react-bootstrap";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// const profiles = {
//   'VS Code': {
//     'Left Mouse Click': 'Select',
//     'Right Mouse Click': 'Context Menu',
//     'Scroll Click': 'Open Link',
//     'Scroll Up': 'Scroll Up',
//     'Scroll Down': 'Scroll Down',
//     'Scroll Left': 'Switch Tab Left',
//     'Scroll Right': 'Switch Tab Right',
//     'Start/Stop Video': 'Toggle Terminal',
//     'Mute/Unmute': 'Command Palette',
//     'Share Screen': 'Search Files',
//     'Disable 1': 'Disable',
//     'Disable 2': 'Disable',
//   },
//   'Photoshop': {
//     'Left Mouse Click': 'Brush',
//     'Right Mouse Click': 'Eyedropper',
//     'Scroll Click': 'Hand Tool',
//     'Scroll Up': 'Zoom In',
//     'Scroll Down': 'Zoom Out',
//     'Scroll Left': 'Undo',
//     'Scroll Right': 'Redo',
//     'Start/Stop Video': 'New Layer',
//     'Mute/Unmute': 'Toggle Panels',
//     'Share Screen': 'Fit on Screen',
//     'Disable 1': 'Disable',
//     'Disable 2': 'Disable',
//   },
//   'Illustrator': {
//     'Left Mouse Click': 'Brush',
//     'Right Mouse Click': 'Eyedropper',
//     'Scroll Click': 'Hand Tool',
//     'Scroll Up': 'Zoom In',
//     'Scroll Down': 'Zoom Out',
//     'Scroll Left': 'Undo',
//     'Scroll Right': 'Redo',
//     'Start/Stop Video': 'New Layer',
//     'Mute/Unmute': 'Toggle Panels',
//     'Share Screen': 'Fit on Screen',
//     'Disable 1': 'Disable',
//     'Disable 2': 'Disable',
//   },
//   'Rhino': {
//     'Left Mouse Click': 'Select',
//     'Right Mouse Click': 'Repeat Last Command',
//     'Scroll Click': 'Pan',
//     'Scroll Up': 'Zoom In',
//     'Scroll Down': 'Zoom Out',
//     'Scroll Left': 'Rotate View Left',
//     'Scroll Right': 'Rotate View Right',
//     'Start/Stop Video': 'Set View',
//     'Mute/Unmute': 'Snap Toggle',
//     'Share Screen': 'Perspective Mode',
//     'Disable 1': 'Disable',
//     'Disable 2': 'Disable',
//   },
//   'Valorant': {
//     'Left Mouse Click': 'Primary Fire',
//     'Right Mouse Click': 'Aim Down Sight',
//     'Scroll Click': 'Open Map',
//     'Scroll Up': 'Next Weapon',
//     'Scroll Down': 'Melee',
//     'Scroll Left': 'Use Ability Q',
//     'Scroll Right': 'Use Ability E',
//     'Start/Stop Video': 'Use Ability C',
//     'Mute/Unmute': 'Ultimate (X)',
//     'Share Screen': 'Ping / Voice Wheel',
//     'Disable 1': 'Disable',
//     'Disable 2': 'Disable',
//   },
//   'THE FINALS': {
//     'Left Mouse Click': 'Shoot',
//     'Right Mouse Click': 'Throw Grenade',
//     'Scroll Click': 'Equip Skill',
//     'Scroll Up': 'Switch to Main Weapon',
//     'Scroll Down': 'Switch to Tool',
//     'Scroll Left': 'Grapple / Dash',
//     'Scroll Right': 'Interact / Revive',
//     'Start/Stop Video': 'Use Healing Item',
//     'Mute/Unmute': 'Voice Chat',
//     'Share Screen': 'Ping Enemy',
//     'Disable 1': 'Disable',
//     'Disable 2': 'Disable',
//   },
// };


// export default function MouseMacroPage() {
//   const [currentProfile, setCurrentProfile] = useState("Photoshop");
//   const bindings = profiles[currentProfile];

//   const mouseRef = useRef();
//   const triggerRef = useRef();
//   const containerRef = useRef();
//   const [showMultiScreen, setShowMultiScreen] = useState(false);

//   const screens = [
//     {
//       label: "Photoshop",
//       imgSrc: "/ps.jpg",
//       transformStyle: "rotateY(15deg) scale(0.85)",
//       marginStyle: { marginRight: "clamp(-40px, -5vw, -50px)" },
//     },
//     {
//       label: "Rhino",
//       imgSrc: "/rhino.jpg",
//       transformStyle: "rotateY(-15deg) scale(0.85)",
//       marginStyle: { marginLeft: "clamp(-40px, -5vw, -50px)" },
//     },
//   ];

//   const [visible, setVisible] = useState(() => screens.map(() => false));
//   const cardRefs = useRef(screens.map(() => React.createRef()));
//   const timeoutRefs = useRef(screens.map(() => null));

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: triggerRef.current,
//         start: "top-=100 top", // 👈 延遲 200px 觸發
//         end: "+=200",
//         onEnter: () => {
//           gsap.to(mouseRef.current, {
//             opacity: 0,
//             y: -20,
//             duration: 0.4,
//             onComplete: () => setShowMultiScreen(true),
//           });
//         },
//         onLeaveBack: () => {
//           setShowMultiScreen(false);
//           gsap.to(mouseRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 0.4,
//           });
//         },
//       });
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);
//   useEffect(() => {
//     cardRefs.current.forEach((ref) => {
//       gsap.set(ref.current, {
//         opacity: 0,
//         y: 20,
//         x: 20,
//         scale: 0.8,
//         transformOrigin: "bottom right",
//       });
//     });
//   }, []);

//   useEffect(() => {
//     visible.forEach((isVisible, i) => {
//       const ref = cardRefs.current[i];
//       if (!ref.current) return;
//       gsap.to(ref.current, {
//         opacity: isVisible ? 1 : 0,
//         y: isVisible ? 0 : 20,
//         x: isVisible ? 0 : 20,
//         scale: isVisible ? 1 : 0.8,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     });
//   }, [visible]);

//   const toggleCard = (index, show) => {
//     clearTimeout(timeoutRefs.current[index]);
//     setVisible((prev) => prev.map((v, i) => (i === index ? show : v)));
//   };

//   const autoHideCard = (index) => {
//     toggleCard(index, true);
//     timeoutRefs.current[index] = setTimeout(() => toggleCard(index, false), 1800);
//   };

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         minHeight: "120vh",
//         overflowY: "auto",
//         scrollBehavior: "smooth",
//         backgroundColor: "#121212",
//         position: "relative"
//       }}
//     >
//       <div
//         className="w-100 text-center"
//         style={{

//           zIndex: 9999,
//           width: "100%", // ✅ 確保滿寬
//           padding: "1.5rem 1rem", // 等同 Bootstrap 的 px-3 py-4
//           borderBottom: "1px solid rgba(255,255,255,0.1)",
//         }}
//       >
//         <h1 className="display-6 fw-bold mb-3">HIGH PROFILE PERFORMANCE</h1>
//         <p
//           className="text-secondary mb-3"
//           style={{ maxWidth: "600px", margin: "0 auto" }}
//         >
//           Seamlessly switch between any of your custom button profiles via a
//           programmable button underneath the mouse for optimized performance with
//           every app and task.
//         </p>


//       </div>

//       <div
//         className="d-flex flex-wrap justify-content-center gap-2"
//         ref={triggerRef}
//         style={{
//           position: "sticky",
//           top: 0, // 在頁面往下捲到 160px 高時開始 sticky
//           zIndex: 1000, // 確保蓋在內容上方

//           padding: "1rem 0", // 可選，增加間距
//         }}
//       >
//         {Object.keys(profiles).map((profile) => (
//           <button
//             key={profile}
//             className={`btn btn-sm ${currentProfile === profile
//                 ? "btn-success text-dark"
//                 : "btn-outline-light"
//               }`}
//             onClick={() => setCurrentProfile(profile)}
//           >
//             {profile}
//           </button>
//         ))}
//       </div>


//       {!showMultiScreen && (
//         <>

//           <div
//             ref={mouseRef}
//             className="position-relative d-flex justify-content-center py-2"
//             style={{ minHeight: "150vh" }}
//           >

//             <div style={{ width: "400px", height: "500px", position: "relative" }}>

//               <img
//                 src="/top.png"
//                 alt="Mouse"
//                 className="mt-5 img-fluid h-100 w-100 object-fit-contain"
//                 style={{ objectFit: "contain" }}
//               />
//               {Object.entries(bindings).map(([label, value], index) => {
//                 const isLeft = index < 6;
//                 const topOffset = 20 + index * 35;
//                 return (
//                   <div
//                     key={label}
//                     className={`position-absolute ${isLeft ? "text-start" : "text-end"}`}
//                     style={{
//                       top: `${topOffset}px`,
//                       left: isLeft ? "-180px" : "auto",
//                       right: isLeft ? "auto" : "-180px",
//                     }}
//                   >
//                     <div className="fw-semibold text-success">{label}</div>
//                     <div className="small text-secondary">{value}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}

//       {showMultiScreen && (
//         <div className="py-2 d-flex justify-content-center gap-5 flex-wrap">
//           {screens.map((screen, i) => (
//             <div key={screen.label} style={{ perspective: "1200px" }} className="mt-5
//             ">

//               <div
//                 onMouseEnter={() => autoHideCard(i)}
//                 onMouseLeave={() => toggleCard(i, false)}
//                 style={{
//                   ...screen.marginStyle,
//                   transform: screen.transformStyle,
//                   position: "relative",
//                   boxShadow: visible[i]
//                     ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
//                     : "none",
//                   transition: "box-shadow 0.3s ease",
//                 }}
//               >
//                 <img
//                   src={screen.imgSrc}
//                   alt={screen.label}
//                   style={{
//                     width: "clamp(300px, 48vw, 850px)",
//                     display: "block",
//                   }}
//                 />
//                 <img
//                   src="/top.png"
//                   alt="trigger base"
//                   style={{
//                     position: "absolute",
//                     bottom: "0.5rem",
//                     right: "0.5rem",
//                     width: "48px",
//                     zIndex: 999,
//                     pointerEvents: "none",
//                   }}
//                 />
//                 <Card
//                   ref={cardRefs.current[i]}
//                   className="position-absolute text-white"
//                   style={{
//                     bottom: 0,
//                     right: 0,
//                     width: "320px",
//                     backgroundColor: "rgb(51,51,51)",
//                     margin: "1rem",
//                     display: "flex",
//                     flexDirection: "column",
//                     maxHeight: "90%",
//                     zIndex: 100,
//                     opacity: 0,
//                     pointerEvents: "auto",
//                   }}
//                 >
//                   <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
//                     <span className="small">{screen.label} Profile On</span>
//                     <span
//                       style={{ cursor: "pointer" }}
//                       onClick={() => toggleCard(i, false)}
//                     >
//                       ×
//                     </span>
//                   </Card.Header>
//                   <Card.Body className="px-3 py-2">
//                     <Form.Check
//                       type="checkbox"
//                       id={`dont-show-${screen.label.toLowerCase()}`}
//                       label="Don't show this again"
//                       className="text-white small"
//                     />
//                   </Card.Body>
//                 </Card>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



































// import React, { useEffect, useRef, useState } from "react";
// import { Card, Form } from "react-bootstrap";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// const profiles = {
//   "VS Code": {
//     "Left Mouse Click": "Select",
//     "Right Mouse Click": "Context Menu",
//     "Scroll Click": "Open Link",
//     "Scroll Up": "Scroll Up",
//     "Scroll Down": "Scroll Down",
//     "Scroll Left": "Switch Tab Left",
//     "Scroll Right": "Switch Tab Right",
//     "Start/Stop Video": "Toggle Terminal",
//     "Mute/Unmute": "Command Palette",
//     "Share Screen": "Search Files",
//     "Disable 1": "Disable",
//     "Disable 2": "Disable",
//   },
// };

// export default function MouseMacroPage() {
//   const [currentProfile, setCurrentProfile] = useState("VS Code");
//   const bindings = profiles[currentProfile];

//   const mouseRef = useRef();
//   const triggerRef = useRef();
//   const containerRef = useRef();
//   const [showMultiScreen, setShowMultiScreen] = useState(false);

//   const screens = [
//     {
//       label: "Photoshop",
//       imgSrc: "/ps.jpg",
//       transformStyle: "rotateY(15deg) scale(0.85)",
//       marginStyle: { marginRight: "clamp(-40px, -5vw, -50px)" },
//     },
//     {
//       label: "Rhino",
//       imgSrc: "/rhino.jpg",
//       transformStyle: "rotateY(-15deg) scale(0.85)",
//       marginStyle: { marginLeft: "clamp(-40px, -5vw, -50px)" },
//     },
//   ];

//   const [visible, setVisible] = useState(() => screens.map(() => false));
//   const cardRefs = useRef(screens.map(() => React.createRef()));
//   const timeoutRefs = useRef(screens.map(() => null));

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: triggerRef.current,
//         start: "top top", // 👈 延遲 200px 觸發
//         end: "+=200",
//         onEnter: () => {
//           gsap.to(mouseRef.current, {
//             opacity: 0,
//             y: -20,
//             duration: 0.4,
//             onComplete: () => setShowMultiScreen(true),
//           });
//         },
//         onLeaveBack: () => {
//           setShowMultiScreen(false);
//           gsap.to(mouseRef.current, {
//             opacity: 1,
//             y: 0,
//             duration: 0.4,
//           });
//         },
//       });
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);
//   useEffect(() => {
//     cardRefs.current.forEach((ref) => {
//       gsap.set(ref.current, {
//         opacity: 0,
//         y: 20,
//         x: 20,
//         scale: 0.8,
//         transformOrigin: "bottom right",
//       });
//     });
//   }, []);

//   useEffect(() => {
//     visible.forEach((isVisible, i) => {
//       const ref = cardRefs.current[i];
//       if (!ref.current) return;
//       gsap.to(ref.current, {
//         opacity: isVisible ? 1 : 0,
//         y: isVisible ? 0 : 20,
//         x: isVisible ? 0 : 20,
//         scale: isVisible ? 1 : 0.8,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     });
//   }, [visible]);

//   const toggleCard = (index, show) => {
//     clearTimeout(timeoutRefs.current[index]);
//     setVisible((prev) => prev.map((v, i) => (i === index ? show : v)));
//   };

//   const autoHideCard = (index) => {
//     toggleCard(index, true);
//     timeoutRefs.current[index] = setTimeout(() => toggleCard(index, false), 1800);
//   };

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         minHeight: "200vh",
//         overflowY: "auto",
//         scrollBehavior: "smooth",
//         backgroundColor: "#121212",
//       }}
//     >
//       <div
//         ref={triggerRef}
//         className="w-100 px-3 py-4 text-center"
//         style={{
//           position: "sticky",
//           top: 0,
//           backgroundColor: "#000",
//           zIndex: 1000,
//           borderBottom: "1px solid rgba(255,255,255,0.1)",
//         }}
//       >
//         <h1 className="display-6 fw-bold mb-3">HIGH PROFILE PERFORMANCE</h1>
//         <p className="text-secondary mb-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
//           Seamlessly switch between any of your custom button profiles via a programmable button underneath the mouse for optimized performance with every app and task.
//         </p>
//         <div className="d-flex flex-wrap justify-content-center gap-2">
//           {Object.keys(profiles).map((profile) => (
//             <button
//               key={profile}
//               className={`btn btn-sm ${
//                 currentProfile === profile ? "btn-success text-dark" : "btn-outline-light"
//               }`}
//               onClick={() => setCurrentProfile(profile)}
//             >
//               {profile}
//             </button>
//           ))}
//         </div>
//       </div>

//       {!showMultiScreen && (
//         <div
//           ref={mouseRef}
//           className="position-relative d-flex justify-content-center py-5"
//           style={{ minHeight: "150vh" }}
//         >
//           <div style={{ width: "400px", height: "500px", position: "relative" }}>
//             <img
//               src="/top.png"
//               alt="Mouse"
//               className="img-fluid h-100 w-100 object-fit-contain"
//               style={{ objectFit: "contain" }}
//             />
//             {Object.entries(bindings).map(([label, value], index) => {
//               const isLeft = index < 6;
//               const topOffset = 20 + index * 35;
//               return (
//                 <div
//                   key={label}
//                   className={`position-absolute ${isLeft ? "text-start" : "text-end"}`}
//                   style={{
//                     top: `${topOffset}px`,
//                     left: isLeft ? "-180px" : "auto",
//                     right: isLeft ? "auto" : "-180px",
//                   }}
//                 >
//                   <div className="fw-semibold text-success">{label}</div>
//                   <div className="small text-secondary">{value}</div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {showMultiScreen && (
//         <div className="py-5 d-flex justify-content-center gap-5 flex-wrap">
//           {screens.map((screen, i) => (
//             <div key={screen.label} style={{ perspective: "1200px" }}>
//               <div
//                 onMouseEnter={() => autoHideCard(i)}
//                 onMouseLeave={() => toggleCard(i, false)}
//                 style={{
//                   ...screen.marginStyle,
//                   transform: screen.transformStyle,
//                   position: "relative",
//                   boxShadow: visible[i]
//                     ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
//                     : "none",
//                   transition: "box-shadow 0.3s ease",
//                 }}
//               >
//                 <img
//                   src={screen.imgSrc}
//                   alt={screen.label}
//                   style={{
//                     width: "clamp(300px, 48vw, 850px)",
//                     display: "block",
//                   }}
//                 />
//                 <img
//                   src="/top.png"
//                   alt="trigger base"
//                   style={{
//                     position: "absolute",
//                     bottom: "0.5rem",
//                     right: "0.5rem",
//                     width: "48px",
//                     zIndex: 999,
//                     pointerEvents: "none",
//                   }}
//                 />
//                 <Card
//                   ref={cardRefs.current[i]}
//                   className="position-absolute text-white"
//                   style={{
//                     bottom: 0,
//                     right: 0,
//                     width: "320px",
//                     backgroundColor: "rgb(51,51,51)",
//                     margin: "1rem",
//                     display: "flex",
//                     flexDirection: "column",
//                     maxHeight: "90%",
//                     zIndex: 100,
//                     opacity: 0,
//                     pointerEvents: "auto",
//                   }}
//                 >
//                   <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
//                     <span className="small">{screen.label} Profile On</span>
//                     <span
//                       style={{ cursor: "pointer" }}
//                       onClick={() => toggleCard(i, false)}
//                     >
//                       ×
//                     </span>
//                   </Card.Header>
//                   <Card.Body className="px-3 py-2">
//                     <Form.Check
//                       type="checkbox"
//                       id={`dont-show-${screen.label.toLowerCase()}`}
//                       label="Don't show this again"
//                       className="text-white small"
//                     />
//                   </Card.Body>
//                 </Card>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
















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
      <h1 className="display-6 fw-bold mb-3">HIGH PROFILE PERFORMANCE</h1>
      <p className="text-secondary text-center mb-4" style={{ maxWidth: '600px' }}>
        Seamlessly switch between any of your custom button profiles via a programmable button underneath the mouse for
        optimized performance with every app and task.
      </p>

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
    </div>
  );
}
