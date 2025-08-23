import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function Jumbotron() {
  const [isMobile, setIsMobile] = useState(false);

  // Refs
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const listRefs = useRef([]);

  // 畫面寬度監聽
  useEffect(() => {
    const checkSize = () => {
      const vw = window.visualViewport?.width || window.innerWidth;
      setIsMobile(vw <= 1150);
    };
    checkSize();
    window.visualViewport?.addEventListener("resize", checkSize);
    window.addEventListener("resize", checkSize);
    return () => {
      window.visualViewport?.removeEventListener("resize", checkSize);
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  // 動畫流程：延遲 1 秒後依序淡入
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // reset 初始狀態
    gsap.set([titleRef.current, subtitleRef.current, ...listRefs.current], {
      opacity: 0,
    });

    const tl = gsap.timeline({ delay: 1 });

    tl.to(titleRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        listRefs.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.2"
      );
  }, [isMobile]);

  const desktopStyle = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    alignItems: "flex-start",
    paddingLeft: "43%",
    textAlign: "left",
    height: "100vh",
    width: "100%",
    backgroundImage: 'url("/hex.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const mobileStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundImage: 'url("/hex.webp")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    position: "relative",
    height: "auto",
    paddingBottom: "40px",
  };

  const items = [
    "Industrial Design",
    "3D Web Design",
    "3D Web Development",
    "Solo Project • 2025",
  ];

  return (
    <div
      className="jumbotron-section wrapper text-md-end"
      style={isMobile ? mobileStyle : desktopStyle}
    >
      {isMobile ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <h1
            ref={titleRef}
            className="fw-bold text"
            style={{
              width: "95%",
              margin: "0 auto",
              fontSize: "clamp(2rem, 16vw, 9rem)",
              whiteSpace: "nowrap",
            }}
          >
            Xoskeleton
          </h1>
          <p ref={subtitleRef} className="description mx-auto text-center fs-4">
            From Office Battles to Gaming Arenas — One Mouse, Total Victory.
          </p>

          <div className="d-flex mt-5">
            <ul className="ms-auto text list-unstyled gap-3 fs-5 text-end">
              {items.map((t, i) => (
                <li
                  key={t}
                  ref={(el) => (listRefs.current[i] = el)}
                  style={{ opacity: 0 }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <img
            src="/3.webp"
            alt="Mobile Illustration"
            style={{ width: "80%", marginBottom: "50px", height: "auto" }}
          />
        </div>
      ) : (
        <div style={{ position: "absolute", top: "20%" }}>
          <h1
            ref={titleRef}
            className="text"
            style={{ fontSize: "9rem", marginBottom: "0" }}
          >
            Xoskeleton
          </h1>
          <p
            ref={subtitleRef}
            className="description mx-auto text-end fs-4  mb-5"
          >
            From Office Battles to Gaming Arenas — One Mouse, Total Victory.
          </p>

          <div className="d-flex mt-5">
            <ul className="ms-auto text list-unstyled gap-3 fs-5 text-end mt-3">
              {items.map((t, i) => (
                <li
                  key={t}
                  ref={(el) => (listRefs.current[i] = el)}
                  style={{ opacity: 0 }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jumbotron;










// import React, { useEffect, useState, useRef } from "react";
// import gsap from "gsap";

// function Jumbotron() {
//   const [isMobile, setIsMobile] = useState(false);

//   // Refs
//   const titleRef = useRef(null);
//   const subtitleRef = useRef(null);
//   const listRefs = useRef([]); 

//   // 畫面寬度監聽
//   useEffect(() => {
//     const checkSize = () => {
//       const vw = window.visualViewport?.width || window.innerWidth;
//       setIsMobile(vw <= 1150);
//     };
//     checkSize();
//     window.visualViewport?.addEventListener("resize", checkSize);
//     window.addEventListener("resize", checkSize);
//     return () => {
//       window.visualViewport?.removeEventListener("resize", checkSize);
//       window.removeEventListener("resize", checkSize);
//     };
//   }, []);

//   // 動畫流程：延遲 1 秒後一次性淡入
//   useEffect(() => {
//     if (!titleRef.current || !subtitleRef.current) return;

//     // 全部重置為透明
//     gsap.set([titleRef.current, subtitleRef.current, ...listRefs.current], {
//       opacity: 0,
//     });

//     // 延遲 1 秒淡入
//     gsap.to([titleRef.current, subtitleRef.current, ...listRefs.current], {
//       opacity: 1,
//       duration: 1,
//       ease: "power1.out",
//       stagger: 0, // 同時
//       delay: 1,   // 延遲 1 秒
//     });
//   }, [isMobile]);

//   const desktopStyle = {
//     display: "flex",
//     flexDirection: "column",
//     position: "relative",
//     alignItems: "flex-start",
//     paddingLeft: "43%",
//     textAlign: "left",
//     height: "100vh",
//     width: "100%",
//     backgroundImage: 'url("/hex.webp")',
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//   };

//   const mobileStyle = {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     width: "100%",
//     backgroundImage: 'url("/hex.webp")',
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     backgroundAttachment: "fixed",
//     position: "relative",
//     height: "auto",
//     paddingBottom: "40px",
//   };

//   const items = [
//     "Industrial Design",
//     "3D Web Design",
//     "3D Web Development",
//     "Solo Project • 2025",
//   ];

//   return (
//     <div
//       className="jumbotron-section wrapper text-md-end"
//       style={isMobile ? mobileStyle : desktopStyle}
//     >
//       {isMobile ? (
//         <div style={{ width: "100%", textAlign: "center" }}>
//           <h1
//             ref={titleRef}
//             className="fw-bold text"
//             style={{
//               width: "95%",
//               margin: "0 auto",
//               fontSize: "clamp(2rem, 16vw, 9rem)",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Xoskeleton
//           </h1>
//           <p
//             ref={subtitleRef}
//             className="description mx-auto text-center fs-4"
//           >
//             From Office Battles to Gaming Arenas — One Mouse, Total Victory.
//           </p>

//           <div className="d-flex mt-5">
//             <ul className="ms-auto text list-unstyled gap-3 fs-5 text-end">
//               {items.map((t, i) => (
//                 <li
//                   key={t}
//                   ref={(el) => (listRefs.current[i] = el)}
//                   style={{ opacity: 0 }}
//                 >
//                   {t}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <img
//             src="/3.webp"
//             alt="Mobile Illustration"
//             style={{ width: "80%", marginBottom: "50px", height: "auto" }}
//           />
//         </div>
//       ) : (
//         <div style={{ position: "absolute", top: "20%" }}>
//           <h1 ref={titleRef} className="text" style={{ fontSize: "9rem", marginBottom:"0" }}>
//             Xoskeleton
//           </h1>
//           <p ref={subtitleRef} className="description mx-auto text-end fs-4  mb-5">
//             From Office Battles to Gaming Arenas — One Mouse, Total Victory.
//           </p>

//           <div className="d-flex mt-5">
//             <ul className="ms-auto text list-unstyled gap-3 fs-5 text-end mt-3">
//               {items.map((t, i) => (
//                 <li
//                   key={t}
//                   ref={(el) => (listRefs.current[i] = el)}
//                   style={{ opacity: 0 }}
//                 >
//                   {t}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Jumbotron;














