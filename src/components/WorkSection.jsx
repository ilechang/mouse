import React, { useEffect, useState } from "react";

function WorkSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 1150);
    checkSize(); // 初始化
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const handleLearnMore = () => {
    const element = document.querySelector(".display-section");
    window.scrollTo({
      top: element?.getBoundingClientRect().bottom,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="sound-section d-flex align-items-center"
      style={{
        backgroundImage: 'url("workbg.webp")',
        backgroundSize: "cover",
        backgroundPosition: isMobile ? "center" : "center", // 📌 小螢幕靠左
        backgroundRepeat: "no-repeat",
        height: "120vh",
        position: "relative", // 讓內部元素可以絕對定位
      }}
    >
         <div className="text-start text-dark p-5 ms-auto " style={{ position: "absolute", left: "35%", bottom: "50%", maxWidth:"450px"}}>



<p className="text-secondary">For Productivity</p>
<h2 className="fw-bold">Efficient Workflow</h2>


<hr
  style={{
    width: "100%",
    margin: "1rem auto",
    borderTop: "8px solid black",
    opacity: 1,
  }}
/>


<p  style={{
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "left",
    fontSize: "1rem",
    lineHeight: "1.6",
  }}>
  With voice input and built-in AI for instant assistant launch, combined with automatic profile detection and switching, your workflows stay seamless and efficient.
</p>

</div>
      <div className="container text-dark text-center">
        <div className="row">
          <div
            className="col-md-4 me-auto position-relative"
            style={{ top: "0px", left: "35%" }}
          >
            {/* <h2 className="title">header 2</h2>
            <p className="h3 fw-bold">Smart for Work</p>
            <p className="description">
              Quick AI assistant launch and smart profile switching streamline creative workflows.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkSection;






