import React from "react";

function WorkSection() {

  const handleLearnMore = () => {
    const element = document.querySelector(".display-section");
    window.scrollTo({
      top: element?.getBoundingClientRect().bottom,
      left: 0,
      behavior: "smooth"
    })
  }

  return (
    <div
      className="sound-section d-flex align-items-center"
      style={{
        backgroundImage: 'url("workbg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "120vh",
      }}
    >
      <div className="container text-dark text-center">
        <div className="row">
        <div className="col-md-4 me-auto position-relative" style={{ top: "0px",
    left: "35%"
      
      }}>
            {/* <h2 className="title">header 2</h2>
            <p className="h3 fw-bold">Smart for Work</p>
            <p className="description">
            Quick AI assistant launch and smart profile switching streamline creative workflows.
            </p> */}
            {/* <button className="btn btn-light mt-3" onClick={handleScrollToTop}>
              TOP
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkSection;
