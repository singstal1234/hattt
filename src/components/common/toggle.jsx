import React, { useState } from "react";

const Toggle = (props) => {
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    props.setDemo(!isActive);
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={toggle}
      style={{
        position: "relative",
        width: "32px",
        height: "16px",
        backgroundColor: isActive ? "#0088ff" : "#191919",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2px",
          left: isActive ? "18px" : "2px",
          width: "12px",
          height: "12px",
          backgroundColor: "white",
          borderRadius: "50%",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
};

export default Toggle;
