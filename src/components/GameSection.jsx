import React from "react";

function GameSection({ triggerPreview }) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div
      className="display-section d-flex align-items-center"
      style={{
        height: "120vh",
        position: "relative", // ⬅️ 讓內部的 img 可以用 absolute
        backgroundImage: 'url("./hex.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      {/* ⬇️ 圖片固定在右下角，無空隙 */}
      <img
        src="./gamingbg.png"
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "auto",     // ✅ 或設百分比寬度
          height: "auto",
          maxWidth: "100%",  // ✅ 防止超出
          maxHeight: "100%", // ✅ 防止超出
        }}
      />
    </div>
  );
}

export default GameSection;
