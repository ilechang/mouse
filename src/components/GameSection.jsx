import React from "react";

function GameSection({ triggerPreview }) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div
      className="display-section d-flex align-items-center"
      style={{
        backgroundImage: 'url("gamingbg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "120vh",
      }}
    >
      <div className="container text-white text-center">
        <div className="row">
        <div className="col-md-6 ms-auto position-relative" style={{ top: "-180px" }}>
            {/* <h2 className="title">header 3</h2>
            <p className="h3 fw-bold">product slogan 3</p>
            <p className="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            </p> */}
            {/* <button className="btn btn-light mt-3" onClick={handleScrollToTop}>
              TOP
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSection;
