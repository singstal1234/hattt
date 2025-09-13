import React, { useEffect, useState } from "react";
import Prize from "../common/prize";
import "./claimModal.css";
import { useDispatch, useSelector } from "react-redux";
import { setSecondModal } from "../../store/slices/modalSlice";
import { setBalance, setStars } from "../../store/slices/userSlice";
import { StarLogo, TonLogo } from "../common/header";

export default function ClaimModal(props) {
  const dispatch = useDispatch();
  const balance = useSelector((s) => s.user.balance);
  const stars = useSelector((s) => s.user.stars);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 50);
  }, []);
  return (
    <div className="claim-modal-wrapper" style={{ opacity: opacity }}>
      <div className="claim-modal">
        <h2 className="claim-modal-text">Congratulation!</h2>
        <Prize
          width={112}
          height={112}
          image={props.image}
          price={props.price}
          stars={props.stars}
          star_price={props.star_price}
        />
        <button
          className="claim-modal-button"
          onClick={() => {
            setOpacity(0);
            if (!props.demo) {
              if (props.stars) dispatch(setStars(stars + props.star_price));
              else dispatch(setBalance(balance + props.price));
            }
            setTimeout(() => {
              dispatch(setSecondModal(null));
            }, 300);
          }}
        >
          Claim {props.stars ? props.star_price : props.price}{" "}
          {props.stars ? <StarLogo /> : <TonLogo color={"white"} />}
        </button>
      </div>
    </div>
  );
}
