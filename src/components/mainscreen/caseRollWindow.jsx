import React, { useEffect, useState } from "react";
import "./caseRollWindow.css";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/slices/modalSlice";

export default function CaseRollWindow(props) {
  function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [prizes, setPrizes] = useState([]);
  const [casePrizes, setCasePrizes] = useState([]);
  const [indexToScroll, setIndexToScroll] = useState(0);

  const [randomOffset, setRandomOffset] = useState(0);

  const [claimButton, setClaimButton] = useState(null);

  const dispatch = useDispatch();

  const [randomTimeout, setRandomTimeout] = useState(null); // вместо undefined

  useEffect(() => {
    setRandomOffset(Math.random() * 60);
    setRandomTimeout(Math.random() * 7 + 7); // от 7 до 14 секунд
  }, []);

  useEffect(() => {
    if (randomTimeout === null) return; // ничего не делать до инициализации

    const timeoutId = setTimeout(() => {
      setClaimButton(
        <button
          className="claim-button"
          onClick={() => {
            dispatch(setModal(null));
          }}
        >
          Claim
        </button>
      );
    }, randomTimeout * 1000 + 1000);

    return () => clearTimeout(timeoutId); // очистка таймера при размонтировании/перерендере
  }, [randomTimeout]);

  const possible_prizes_colors = {
    2: ["#276bd9ff", "#072d69ff", 0.05],
    9: ["#d92727ff", "#690707ff", 1],
    10: ["#27d930ff", "#0a6907ff", 2],
    11: ["#d927d0ff", "#690761ff", 5],
    12: ["#d9be27ff", "#696407ff", 5],
  };

  // Обновляем casePrizes при изменении props.prizes
  useEffect(() => {
    const newCasePrizes = props.prizes.map(
      (element) => possible_prizes_colors[element]
    );
    setCasePrizes(newCasePrizes);
  }, [props.prizes]);

  // Когда casePrizes обновятся, создаём prizes
  useEffect(() => {
    if (casePrizes.length === 0) return;

    const length = 250;
    let newPrizes = [];

    for (let i = 0; i < length; i++) {
      let random_prize_id = getRandomInteger(0, casePrizes.length - 1);
      let random_prize_parameters = casePrizes[random_prize_id];
      newPrizes.push(
        <div
          key={"random-" + i}
          className="case-roll-prize"
          style={{
            backgroundColor: random_prize_parameters[0],
            borderColor: random_prize_parameters[1],
            borderWidth: "2px",
          }}
        >
          {random_prize_parameters[2]} TON
        </div>
      );
    }
    // const mainPrize = possible_prizes_colors[props.prizeId];
    // const random_index = getRandomInteger(100, 200);
    // setPrizes(
    //   newPrizes.toSpliced(
    //     random_index,
    //     0,
    //     <div
    //       key="main-prize"
    //       className="case-roll-prize"
    //       style={{
    //         backgroundColor: mainPrize[0],
    //         borderColor: mainPrize[1],
    //         borderWidth: "2px",
    //       }}
    //     >
    //       {mainPrize[2]} TON
    //     </div>
    //   )
    // );
    // setIndexToScroll(random_index);
  }, [casePrizes, props.prizeId]);

  return (
    <div className="case-roll-window">
      <h3 className="case-roll-title">Rolling Case</h3>
      <div className="case-roll-rollblock">
        <div
          className="case-roll-prizebar"
          style={{
            left: `calc(-63.6362549801px * ${
              indexToScroll + 1
            } + 50% + ${randomOffset}px)`,
            transition: `left ${randomTimeout}s cubic-bezier(.38,.05,.06,1.00)`,
          }}
        >
          {prizes}
        </div>
        <div className="case-roll-selector"></div>
      </div>
      {claimButton == null ? <></> : claimButton}
    </div>
  );
}
