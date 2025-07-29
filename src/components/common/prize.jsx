import React from "react";
import { TonLogo } from "./header.jsx";
import "./prize.css";
export default function Prize(props) {
  return (
    <div
      className="prize-card"
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <img
        className="prize-image"
        style={{
          width: props.width,
          height: props.height,
        }}
        src={props.image}
        alt=""
        srcset=""
      />

      <div className="prize-price">
        <TonLogo color={"white"} />
        <span>{props.price}</span>
      </div>
      {/* <div className="prize-price">
        <TonLogo color={"white"} />
        <span>{props.price}</span>
      </div> */}
      {/* <span style={{ color: "white" }}>{props.id}</span> */}
    </div>
  );
}
