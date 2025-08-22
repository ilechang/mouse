import { useRef, useState, useEffect } from "react";
import { Button, Form, Card, InputGroup } from "react-bootstrap";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TypingText({ text, speed = 50, onFinished }) {
  const [displayed, setDisplayed] = useState("");
  const bufferRef = useRef("");

  useEffect(() => {
    let i = 0;
    const chars = text.split("");
    let interval;

    bufferRef.current = "";
    setDisplayed("");

    interval = setInterval(() => {
      if (i < chars.length) {
        bufferRef.current += chars[i];
        setDisplayed(bufferRef.current);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onFinished?.();
        }, 0);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p
      className="text-white lh-base font-monospace mb-1"
      style={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        fontSize: "0.8rem",
      }}
    >
      {displayed}
    </p>
  );
}

export function AiSimulation() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [showHr, setShowHr] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const userInteractedRef = useRef(false);
  const imgRef = useRef(null);
  const btnContainerRef = useRef(null);
  const cardRef = useRef(null);
  const btnRefs = useRef([]);
  const scrollRef = useRef(null);
  const triggerImgRef = useRef(null);
  btnRefs.current = [];

  const setBtnRef = (el) => {
    if (el && !btnRefs.current.includes(el)) {
      btnRefs.current.push(el);
    }
  };

  const handlePrompt = (type, isLong = false) => {
    setIsFinished(false);
    let content = "";

    if (type === "accept") {
      content = isLong
        ? `Dear HR,
    Thank you very much for offering me the position at ABC Design. I am thrilled to accept the role and am genuinely excited about the opportunity to work with such a talented team. I believe my background in design and my passion for innovation will make a meaningful contribution to your company’s goals.
    
    Please let me know the next steps in the onboarding process. I look forward to collaborating with everyone at ABC Design.
    
Best regards,  
Ilia Chang`
        : `Dear HR,
    Thank you very much for offering me the position at ABC Design. I’m happy to accept the offer and look forward to contributing to the team.
    
Best regards,  
Ilia Chang`;
    } else if (type === "decline") {
      content = isLong
        ? `Dear HR, 
    Thank you sincerely for the opportunity and for offering me the position at ABC Design. After much thought and careful consideration, I’ve decided to pursue another opportunity that aligns more closely with my long-term career aspirations and personal values.
    
    It was truly a pleasure speaking with your team, and I deeply appreciate the time and effort invested in the recruitment process. I wish ABC Design continued success and hope our paths may cross again in the future.
    
Best regards,  
Ilia Chang`
        : `Dear HR, 
    Thank you for the opportunity and for offering me the position at ABC Design. After careful consideration, I’ve decided to pursue another opportunity that better aligns with my current goals.
    
    I truly appreciate your team’s time and effort throughout the process and wish you continued success.
    
Best regards,  
Ilia Chang`;
    } else if (type === "translate") {
      content = `張先生您好, 
        
    我們謹向您提案擔任 ABC Design 的資深設計師職位，任職日期為 2026 年 3 月 1 日。

    本職位的年薪為 11,000 美元，將以月薪形式支付。工作形式為混合制，每週一與週三需到公司出勤，其餘日子則可遠端工作。

    若您接受本提案，敬請回覆本郵件。我們將另行提供入職手續的詳細資訊。關於雇用條件與福利等詳情，請參閱附件中的聘用合約書。

我們誠摯期待您加入 ABC Design。
    
John Doe  
人事部  
ABC Design`;
    }

    if (!isLong && type !== "translate") {
      setHistory([content]);
    }
    setText(content);
  };

  useEffect(() => {
    const checkSize = () =>
      setIsMobile((window.visualViewport?.width || window.innerWidth) <= 1150);

    checkSize();
    window.visualViewport?.addEventListener("resize", checkSize);
    window.addEventListener("resize", checkSize);

    return () => {
      window.visualViewport?.removeEventListener("resize", checkSize);
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && imgRef.current && cardRef.current) {
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 20,
        x: 20,
        scale: 0.8,
        transformOrigin: "bottom right",
      });

      btnRefs.current.forEach((btn) =>
        gsap.set(btn, { opacity: 0, y: 10 })
      );

      ScrollTrigger.create({
        trigger: imgRef.current,
        start: "bottom bottom",
        onEnter: () => {
          gsap.to(triggerImgRef.current, {
            delay: 0.8,
            opacity: 1,
            duration: 0.001,
            ease: "none",
          });

          gsap.to(cardRef.current, {
            delay: 0.8,
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              const tl = gsap.timeline();

              if (btnContainerRef.current) {
                tl.set(btnContainerRef.current, {
                  visibility: "visible",
                  height: "auto",
                });
              }

              btnRefs.current.forEach((btn, index) => {
                tl.fromTo(
                  btn,
                  { opacity: 0, y: 10 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.1,
                    ease: "power2.out",
                  },
                  index === 0 ? "+=0.1" : "+=0.01"
                );
              });

              setTimeout(() => {
                if (userInteractedRef.current) return;
                const acceptBtn = btnRefs.current[0];
                if (acceptBtn) {
                  gsap.fromTo(
                    acceptBtn,
                    { scale: 1, opacity: 1 },
                    {
                      scale: 1,
                      opacity: 0.5,
                      duration: 0.1,
                      ease: "power2.out",
                      yoyo: true,
                      repeat: 1,
                      onComplete: () => {
                        setActiveBtn("accept");
                        handlePrompt("accept");
                        setShowHr(true);
                      },
                    }
                  );
                } else {
                  setActiveBtn("accept");
                  handlePrompt("accept");
                  setShowHr(true);
                }
              }, 1000);
            },
          });
        },
      });
    }
  }, [isMobile]);

  return (
    <div className="bg-white text-dark text-center py-5">
      <h1 className="display-6 fw-bold mb-3 mt-4">
        Talk to AI with just one click.
      </h1>
      <span className="text-center mx-auto" style={{ maxWidth: "1000px" }}>
        With ChatGPT AI built into your mouse app, your mouse is no longer just
        an input device — it’s your smart assistant.
      </span>

      <div className="vh-50 d-flex align-items-start sound-section my-5">
        <div className="w-100 bg-white px-5 d-flex flex-wrap justify-content-center mt-5">
          {/* Small window */}
          <div
            style={{
              maxWidth: isMobile ? "100%" : "35%",
              marginBottom: isMobile ? "2rem" : "0",
            }}
            className="d-flex flex-column justify-content-center align-items-center text-dark text-center"
          >
            <img src="./aichip.webp" className="w-50 mb-3" alt="" />
            <p
              style={{
                width: "90%",
                maxWidth: "600px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              Copy, click, and unlock AI prompts instantly. Built-in mic and
              voice recognition make interaction effortless — no typing
              required.
            </p>
          </div>

          {/* Large window */}
          <div
            style={{
              flex: "1 1 400px",
              maxWidth: "1000px",
              perspective: "1200px",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s ease-out",
            }}
            className="d-flex justify-content-center me-2"
          >
            <div
              style={{
                transform: "rotateX(10deg) rotateY(-15deg)",
                transformStyle: "preserve-3d",
                position: "relative",
                width: "90%",
              }}
            >
              {isMobile ? (
                <img
                  src="./ai.jpg"
                  alt="AI Static"
                  className="rounded"
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              ) : (
                <>
                  <img
                    ref={imgRef}
                    src="./email.jpg"
                    alt="email screenshot"
                    className="rounded shadow"
                    style={{
                      width: "100%",
                      display: "block",
                      pointerEvents: "none",
                    }}
                  />

                  {/* 桌機的 Card */}
                  <Card
                    ref={cardRef}
                    className="position-absolute text-white"
                    style={{
                      bottom: 0,
                      right: 0,
                      width: "35%",
                      backgroundColor: "rgb(51,51,51)",
                      margin: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "90%",
                      zIndex: 100,
                      transform: "translateX(100px)",
                      opacity: 0,
                      pointerEvents: "auto",
                      textAlign: "left",
                    }}
                  >
                    <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
                      <span className="small">Mouse’s AI Chat Window</span>
                      <span style={{ cursor: "pointer" }}>×</span>
                    </Card.Header>

                    <div
                      ref={scrollRef}
                      style={{
                        overflowY: "auto",
                        flexGrow: 1,
                        maxHeight: "100%",
                      }}
                    >
                      <Card.Body>
                        <Card.Title className="fs-5 text-center">
                          How may I help you?
                        </Card.Title>
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Ask me anything..."
                            className="bg-dark text-white border placeholder-white border-secondary font-monospace"
                            readOnly
                          />
                          <Button variant="secondary">↑</Button>
                        </InputGroup>

                        <p className="small mb-1">Suggested Prompts:</p>
                        <div
                          className="d-flex flex-wrap gap-2 mb-3"
                          ref={(el) => (btnContainerRef.current = el)}
                          style={{
                            visibility: "hidden",
                            height: 0,
                            overflow: "hidden",
                          }}
                        >
                          <Button
                            ref={setBtnRef}
                            variant={activeBtn === "accept" ? "dark" : "secondary"}
                            size="sm"
                            className={`rounded-pill px-3 ${
                              activeBtn === "accept" ? "border border-white" : ""
                            }`}
                            onClick={() => {
                              userInteractedRef.current = true;
                              setActiveBtn("accept");
                              handlePrompt("accept");
                            }}
                          >
                            Write Acceptance Email
                          </Button>

                          <Button
                            ref={setBtnRef}
                            variant={activeBtn === "decline" ? "dark" : "secondary"}
                            size="sm"
                            className={`rounded-pill px-3 ${
                              activeBtn === "decline" ? "border border-white" : ""
                            }`}
                            onClick={() => {
                              userInteractedRef.current = true;
                              setActiveBtn("decline");
                              handlePrompt("decline");
                            }}
                          >
                            Write Decline Email
                          </Button>

                          <Button
                            ref={setBtnRef}
                            variant={activeBtn === "translate" ? "dark" : "secondary"}
                            size="sm"
                            className={`rounded-pill px-3 ${
                              activeBtn === "translate" ? "border border-white" : ""
                            }`}
                            onClick={() => {
                              userInteractedRef.current = true;
                              setActiveBtn("translate");
                              handlePrompt("translate");
                            }}
                          >
                            Translate / 翻譯
                          </Button>
                        </div>

                        {showHr && <hr />}
                        {text && (
                          <>
                            <TypingText
                              text={text}
                              speed={speed}
                              onFinished={() => {
                                setIsFinished(true);
                                setTimeout(() => {
                                  scrollRef.current?.scrollTo({
                                    top: scrollRef.current.scrollHeight,
                                    behavior: "smooth",
                                  });
                                }, 0);
                              }}
                            />
                            {isFinished && activeBtn !== "translate" && (
                              <div className="d-flex gap-2 mt-2">
                                {history.length === 1 && text === history[0] && (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="rounded-pill px-3 mt-3"
                                    onClick={() => handlePrompt(activeBtn, true)}
                                  >
                                    Make it longer
                                  </Button>
                                )}

                                {history.length === 1 && text !== history[0] && (
                                  <Button
                                    variant="secondary"
                                    size="sm"
                                    className="rounded-pill px-3 mt-3"
                                    onClick={() => {
                                      setIsFinished(false);
                                      setText(history[0]);
                                    }}
                                  >
                                    ← Previous Version
                                  </Button>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </Card.Body>
                    </div>
                  </Card>

                  <img
                    ref={triggerImgRef}
                    src="./top.webp"
                    alt="trigger base"
                    style={{
                      position: "absolute",
                      bottom: "0.1rem",
                      right: "0.1rem",
                      width: "48px",
                      opacity: 0,
                      zIndex: 999,
                      pointerEvents: "none",
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
