import React, { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import gsap from "gsap";

function MultiScreen({ setHoveredProfile }) {
  const screens = [
    {
      label: "Photoshop",
      imgSrc: "/ps.jpg",
      transformStyle: "rotateY(15deg) scale(0.85)",
      marginStyle: { marginRight: "clamp(-40px, -5vw, -50px)" },
    },
    {
      label: "vscode",
      imgSrc: "/vscode.jpg",
      transformStyle: "rotateY(-15deg) scale(0.85)",
      marginStyle: { marginLeft: "clamp(-40px, -5vw, -50px)" },
    },
  ];

  const [visible, setVisible] = useState(() => screens.map(() => false));
  const cardRefs = useRef(screens.map(() => React.createRef()));
  const timeoutRefs = useRef(screens.map(() => null));

  // 初始動畫設定
  useEffect(() => {
    cardRefs.current.forEach((ref) => {
      gsap.set(ref.current, {
        opacity: 0,
        y: 20,
        x: 20,
        scale: 0.8,
        transformOrigin: "bottom right",
      });
    });
  }, []);

  // 出現動畫
  useEffect(() => {
    visible.forEach((isVisible, i) => {
      const ref = cardRefs.current[i];
      if (!ref.current) return;

      gsap.to(ref.current, {
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        x: isVisible ? 0 : 20,
        scale: isVisible ? 1 : 0.8,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }, [visible]);

  const toggleCard = (index, show) => {
    clearTimeout(timeoutRefs.current[index]);
    setVisible((prev) =>
      prev.map((v, i) => (i === index ? show : v))
    );
  };

  const autoHideCard = (index) => {
    toggleCard(index, true);
    timeoutRefs.current[index] = setTimeout(() => toggleCard(index, false), 1800);
  };

  const handleMouseEnter = (index) => {
    autoHideCard(index);
    if (setHoveredProfile) {
      setHoveredProfile(screens[index].label.toLowerCase()); // e.g., 'photoshop'
    }
  };

  const handleMouseLeave = (index) => {
    toggleCard(index, false);
    if (setHoveredProfile) {
      setHoveredProfile(null);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        backgroundColor: "rgb(31,31,31)",
      }}
    >
      {screens.map((screen, i) => (
        <div key={screen.label} style={{ perspective: "1200px" }}>
          <div
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{
              ...screen.marginStyle,
              transform: screen.transformStyle,
              position: "relative",
              boxShadow: visible[i]
                ? "0 0 20px 5px rgba(0, 123, 255, 0.9)"
                : "none",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <img
              src={screen.imgSrc}
              alt={screen.label}
              style={{
                width: "clamp(300px, 48vw, 850px)",
                display: "block",
              }}
            />
            <img
              src="./top.png"
              alt="trigger base"
              style={{
                position: "absolute",
                bottom: "0.5rem",
                right: "0.5rem",
                width: "48px",
                zIndex: 999,
                pointerEvents: "none",
              }}
            />

            <Card
              ref={cardRefs.current[i]}
              className="position-absolute text-white"
              style={{
                bottom: 0,
                right: 0,
                width: "320px",
                backgroundColor: "rgb(51,51,51)",
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
                maxHeight: "90%",
                zIndex: 100,
                opacity: 0,
                pointerEvents: "auto",
              }}
            >
              <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
                <span className="small">{screen.label} Profile On</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleCard(i, false)}
                >
                  ×
                </span>
              </Card.Header>
              <Card.Body className="px-3 py-2">
                <Form.Check
                  type="checkbox"
                  id={`dont-show-${screen.label.toLowerCase()}`}
                  label="Don't show this again"
                  className="text-white small"
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MultiScreen;



