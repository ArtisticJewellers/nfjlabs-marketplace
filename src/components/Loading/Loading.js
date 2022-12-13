import React from "react";
import Lottie from "react-lottie";
import loading from "./loading.json";
function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}

export default Loading;
