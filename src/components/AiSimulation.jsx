
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
        // ✅ 用 setTimeout 確保畫面先完成更新再呼叫 onFinished（避免 race condition）
        setTimeout(() => {
          onFinished?.();
        }, 0);
      }
    }, speed);

    return () => clearInterval(interval);
    // ✅ 注意：這裡不要依賴 onFinished（因為每次 render 它都變）
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
  const [history, setHistory] = useState([]); // 用來儲存前一個版本
  const [isFinished, setIsFinished] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [showHr, setShowHr] = useState(false);
  const [activeBtn, setActiveBtn] = useState(null); // ➤ 新增狀態：目前哪顆按鈕被按
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
    setIsFinished(false); // ✅ 重設打字完成狀態

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
      setHistory([content]); // ✅ 只儲存短版本
    }

    setText(content); // ✅ 打字效果觸發
  };




  useEffect(() => {
    if (imgRef.current && cardRef.current) {
      // 設定初始狀態：往右下偏移、縮小、透明
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 20,
        x: 20,
        scale: 0.8,
        transformOrigin: "bottom right",
      });




      // 設定按鈕初始狀態
      btnRefs.current.forEach((btn) =>
        gsap.set(btn, { opacity: 0, y: 10 })
      );

      // 建立 scroll trigger
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


          // 卡片動畫：淡入 + 滑動 + 放大
          gsap.to(cardRef.current, {
            delay: 0.8,
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            // 在卡片出現後開始動畫
            onComplete: () => {
              const tl = gsap.timeline();

              if (btnContainerRef.current) {
                tl.set(btnContainerRef.current, {
                  visibility: "visible",
                  height: "auto",      // ✅ 撐開高度
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

              // 保留你的延遲觸發自動點擊邏輯
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
            }
            ,
          });
        },
      });
    }
  }, []);



  return (
    <>
    <div className="sound-section wrapper " style={{padding:0, margin:0}}>
    <div className="body">
    <div className="sound-section-content content">
        <h2 className="title">hearder 4</h2>
        <p className="text">One click to AI</p>
        <span className="description">
          Lorem ipsum proident dolor sit amet, adipiscing elit.
        </span>
        <ul className="links">
          <li>
            <button className="button">Buy</button>
          </li>
          <li>
            <a className="link"  >Learn more</a>
          </li>
        </ul>
      </div>
      </div>
      </div>

    <div className="vh-100 bg-white d-flex align-items-start sound-section ">

     

      <div
        className="w-100 px-5 d-flex flex-wrap justify-content-center "
        
      >
        {/* Small window */}
        <div
          style={{
            transform: "perspective(1200px) rotateX(10deg) rotateY(35deg) scale(0.85)",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s ease-out",
            flex: "1 1 300px",
            maxWidth: "700px",
          }}
          className="d-flex justify-content-center"
        >
          <div style={{ position: "relative", width: "100%" }} className="mt-auto mb-5">
            <img
              src="./word.jpg"
              alt="word screenshot"
              className="rounded mt-auto shadow"
              style={{
                width: "100%",
                pointerEvents: "none",
                display: "block",
              }}
            />

            {/* ✅ Word視窗模擬AI卡片，貼齊右下角 */}
            <Card
              className="position-absolute text-white"
              style={{
                bottom: "0.4rem",
                right: "1rem",
                width: "250px",
                backgroundColor: "rgb(51,51,51)",
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                zIndex: 100,
                transform: "none", // 無偏移，直接對齊
                opacity: 1,
                pointerEvents: "auto",
              }}
            >
              <Card.Header className="bg-secondary py-2 px-3 d-flex justify-content-between align-items-center">
                <span className="small">Word's AI Helper</span>
                <span style={{ cursor: "pointer" }}>×</span>
              </Card.Header>

              <div
                style={{
                  overflowY: "auto",
                  flexGrow: 1,
                  fontSize: "0.75rem", // ✅ 整體縮小字體
                  pointerEvents: "none", // ✅ 禁用所有互動

                }}
              >
                <Card.Body>
                  <Card.Title className="fs-6 text-center">How may I help you?</Card.Title>


                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Summarize this paragraph..."
                      className="bg-dark text-white border-0 font-monospace"
                      readOnly // ✅ 輸入欄也不可輸入（保險用）
                    />
                    <Button variant="secondary" disabled>💡</Button>
                  </InputGroup>

                  <p className="small mb-1">Suggested Prompts:</p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <Button size="sm" className="rounded-pill px-3" variant="secondary" style={{
                      fontSize: "0.75rem", // ✅ 整體縮小字體
                    }}>
                      Fix grammar
                    </Button>
                    <Button size="sm" className="rounded-pill px-3" variant="secondary" style={{
                      fontSize: "0.75rem", // ✅ 整體縮小字體
                    }}>
                      Make it longer
                    </Button>
                    <Button size="sm" className="rounded-pill px-3" variant="secondary" style={{
                      fontSize: "0.75rem", // ✅ 整體縮小字體
                    }}>
                      Make it shorter
                    </Button>
                    <Button size="sm" className="rounded-pill px-3" variant="secondary" style={{
                      fontSize: "0.75rem", // ✅ 整體縮小字體
                    }}>
                      Sum up
                    </Button>
                    <Button size="sm" className="rounded-pill px-3" variant="secondary" style={{
                      fontSize: "0.75rem", // ✅ 整體縮小字體
                    }}>
                      Translate / 翻譯
                    </Button>
                  </div>
                </Card.Body>
              </div>
            </Card>
            <img

              src="./top.png"
              alt="trigger base"
              style={{
                position: "absolute",
                bottom: "0.1rem",
                right: "0.1rem",
                width: "36px",
                opacity: 1,
                zIndex: 999, // < 卡片的 zIndex: 100
                pointerEvents: "none",
              }}
            />

          </div>
        </div>


        {/* Large window - 統一 transform 區塊 */}
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
              width: "100%",
            }}
          >
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


            {/* ✅ AI Chat Window Card */}
            <Card
              ref={cardRef}
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
                zIndex: 100, // ⬆ 在 top.png 之上
                transform: "translateX(100px)", // 👈 初始從右邊滑入
                opacity: 0, // 👈 初始透明，等待動畫出現
                pointerEvents: "auto",
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
                  <Card.Title className="fs-5 text-center">How may I help you?</Card.Title>
                  <InputGroup className="mb-3  ">
                    <Form.Control
                      placeholder="Ask me anything..."
                      className="bg-dark text-white border placeholder-white border-secondary font-monospace "
                      readOnly

                    />
                    <Button variant="secondary" >↑</Button>
                  </InputGroup>


                  <p className="small mb-1">Suggested Prompts:</p>
                  <div
                    className="d-flex flex-wrap gap-2 mb-3 "
                    ref={el => (btnContainerRef.current = el)} // <== 你要加這個
                    style={{
                      visibility: "hidden", // ✅ 不佔空間
                      height: 0,             // ✅ 不撐開高度
                      overflow: "hidden",
                    }}
                  >
                    <Button
                      ref={setBtnRef}
                      variant={activeBtn === "accept" ? "dark" : "secondary"}
                      size="sm"
                      className={`rounded-pill px-3 ${activeBtn === "accept" ? "border border-white" : ""
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
                      className={`rounded-pill px-3 ${activeBtn === "decline" ? "border border-white" : ""
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
                      className={`rounded-pill px-3 ${activeBtn === "translate" ? "border border-white" : ""
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
                  {/* ✅ AI回應打字效果 */}
                  {text && (
                    <>
                      <TypingText
                        text={text}
                        speed={speed}
                        onFinished={() => {
                          setIsFinished(true);

                          // ✅ 自動滾到底部，讓使用者看到按鈕
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
                                setIsFinished(false); // ✅ reset typing state
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
              src="./top.png"
              alt="trigger base"
              style={{
                position: "absolute",
                bottom: "0.1rem",
                right: "0.1rem",
                width: "48px",
                opacity: 0,
                zIndex: 999, // < 卡片的 zIndex: 100
                pointerEvents: "none",
              }}
            />
          </div>
        </div>


      </div>
    </div>
    </>

  );

}


















