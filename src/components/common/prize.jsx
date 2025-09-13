import React from "react";
import { StarLogo, TonLogo } from "./header.jsx";
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
          width: "100%",
          height: "100%",
        }}
        src={props.image}
        alt=""
        srcset=""
      />
      {props.stars ? (
        <>
          <div className="prize-price">
            <StarLogo />
            <span>{props.star_price}</span>
          </div>
        </>
      ) : (
        <>
          <div className="prize-price">
            <TonLogo color={"white"} />
            <span>{props.price}</span>
          </div>
        </>
      )}

      {/* <div className="prize-price">
        <TonLogo color={"white"} />
        <span>{props.price}</span>
      </div> */}
      {/* <span style={{ color: "white" }}>{props.id}</span> */}
    </div>
  );
}
