import prize1Img from "./../../assets/prize1.png";
import prize2Img from "./../../assets/prize2.png";

import React, { useEffect, useState } from "react";
import "./caseModal.css";
import { useDispatch, useSelector } from "react-redux";
import Prize from "../common/prize";
import axios from "axios";
import { setBg, setModal, setSecondModal } from "../../store/slices/modalSlice";
import { setBalance, setStars } from "../../store/slices/userSlice";
import ClaimModal from "./claimModal";
import Toggle from "../common/toggle";
import StarToggle from "../common/starToggle";

export default function CaseModal(props) {
  function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const balance = useSelector((s) => s.user.balance);

  const [transition, setTransition] = useState(true);

  const tgId = useSelector((s) => s.user.telegramId);

  // const prizeImages = {
  //   2: prize1Img,
  //   9: prize2Img,
  // };

  const onCaseRoll = () => {
    console.log("rolling case");
    setIsRolling(true);
    if (!starToggle) {
      if (!demo) {
        dispatch(setBalance(balance - props.case.price));

        axios
          .post("https://singstal12345.pythonanywhere.com/case/open", {
            case_id: props.case.case_id,
            user_id: tgId,
          })
          .then((r) => {
            // alert(
            //   `Вы выиграли приз ${r.data.prize.prize_id}. ${r.data.prize.name} за ${r.data.prize.price} TON!`
            // );
            const prize_id = r.data.prize.prize_id;
            const prize_ids = [];
            for (let i = 0; i < props.case.prizes.length; i++) {
              prize_ids.push(props.case.prizes[i].prize_id);
            }
            console.log(prize_ids);
            const prize_index = prize_ids.indexOf(prize_id);
            console.log(prize_index);
            const randomTimeout = getRandomInteger(7000, 10000);
            setTransition(true);
            setRandomTimeout(randomTimeout);
            const randomNum =
              getRandomInteger(30, 43) * casePrizes.length + prize_index;
            setIndexToScroll(randomNum);
            const randomOffset = getRandomInteger(1, 86);
            setRandomOffset(randomOffset);
            setLeft(-randomNum * 87 - 4 * (randomNum - 0.5) - randomOffset);
            setTimeout(() => {
              setTransition(false);
              setIsRolling(false);
              setIndexToScroll(casePrizes.length * 4 + prize_index);
              const initialIndex = casePrizes.length * 4 + prize_index;
              setLeft(
                -initialIndex * 87 - 4 * (initialIndex - 0.5) - randomOffset
              );
              dispatch(
                setSecondModal(
                  <ClaimModal
                    demo={false}
                    price={r.data.prize.price}
                    image={`https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
                      r.data.prize.prize_id
                    }&t=${Date.now()}`}
                  />
                )
              );
            }, randomTimeout + 1000);
          });
      } else {
        const prize_ids = [];
        for (let i = 0; i < props.case.prizes.length; i++) {
          prize_ids.push(props.case.prizes[i].prize_id);
        }
        const prize_id = prize_ids[getRandomInteger(0, prize_ids.length - 1)];
        console.log(prize_ids);
        const prize_index = prize_ids.indexOf(prize_id);
        console.log(prize_index);
        const randomTimeout = getRandomInteger(7000, 10000);
        setTransition(true);
        setRandomTimeout(randomTimeout);
        const randomNum =
          getRandomInteger(30, 43) * casePrizes.length + prize_index;
        setIndexToScroll(randomNum);
        const randomOffset = getRandomInteger(1, 86);
        setRandomOffset(randomOffset);
        setLeft(-randomNum * 87 - 4 * (randomNum - 0.5) - randomOffset);
        setTimeout(() => {
          setTransition(false);
          setIsRolling(false);
          setIndexToScroll(casePrizes.length * 4 + prize_index);
          const initialIndex = casePrizes.length * 4 + prize_index;
          setLeft(-initialIndex * 87 - 4 * (initialIndex - 0.5) - randomOffset);
          dispatch(
            setSecondModal(
              <ClaimModal
                demo={true}
                price={props.case.prizes[prize_index].price}
                image={`https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${prize_id}&t=${Date.now()}`}
              />
            )
          );
        }, randomTimeout + 1000);
      }
    } else {
      if (!demo) {
        dispatch(setStars(stars - props.case.star_price));
        axios
          .post("https://singstal12345.pythonanywhere.com/case/open-star", {
            case_id: props.case.case_id,
            user_id: tgId,
          })
          .then((r) => {
            // alert(
            //   `Вы выиграли приз ${r.data.prize.prize_id}. ${r.data.prize.name} за ${r.data.prize.price} TON!`
            // );
            const prize_id = r.data.prize.prize_id;
            const prize_ids = [];
            for (let i = 0; i < props.case.prizes.length; i++) {
              prize_ids.push(props.case.prizes[i].prize_id);
            }
            console.log(prize_ids);
            const prize_index = prize_ids.indexOf(prize_id);
            console.log(prize_index);
            const randomTimeout = getRandomInteger(7000, 10000);
            setTransition(true);
            setRandomTimeout(randomTimeout);
            const randomNum =
              getRandomInteger(30, 43) * casePrizes.length + prize_index;
            setIndexToScroll(randomNum);
            const randomOffset = getRandomInteger(1, 86);
            setRandomOffset(randomOffset);
            setLeft(-randomNum * 87 - 4 * (randomNum - 0.5) - randomOffset);
            setTimeout(() => {
              setTransition(false);
              setIsRolling(false);
              setIndexToScroll(casePrizes.length * 4 + prize_index);
              const initialIndex = casePrizes.length * 4 + prize_index;
              setLeft(
                -initialIndex * 87 - 4 * (initialIndex - 0.5) - randomOffset
              );
              dispatch(
                setSecondModal(
                  <ClaimModal
                    demo={false}
                    price={r.data.prize.price}
                    image={`https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
                      r.data.prize.prize_id
                    }&t=${Date.now()}`}
                    star_price={r.data.prize.star_price}
                    stars={starToggle}
                  />
                )
              );
            }, randomTimeout + 1000);
          });
      } else {
        const prize_ids = [];
        for (let i = 0; i < props.case.prizes.length; i++) {
          prize_ids.push(props.case.prizes[i].prize_id);
        }
        const prize_id = prize_ids[getRandomInteger(0, prize_ids.length - 1)];
        console.log(prize_ids);
        const prize_index = prize_ids.indexOf(prize_id);
        console.log(prize_index);
        const randomTimeout = getRandomInteger(7000, 10000);
        setTransition(true);
        setRandomTimeout(randomTimeout);
        const randomNum =
          getRandomInteger(30, 43) * casePrizes.length + prize_index;
        setIndexToScroll(randomNum);
        const randomOffset = getRandomInteger(1, 86);
        setRandomOffset(randomOffset);
        setLeft(-randomNum * 87 - 4 * (randomNum - 0.5) - randomOffset);
        setTimeout(() => {
          setTransition(false);
          setIsRolling(false);
          setIndexToScroll(casePrizes.length * 4 + prize_index);
          const initialIndex = casePrizes.length * 4 + prize_index;
          setLeft(-initialIndex * 87 - 4 * (initialIndex - 0.5) - randomOffset);
          dispatch(
            setSecondModal(
              <ClaimModal
                demo={true}
                price={props.case.prizes[prize_index].price}
                image={`https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${prize_id}&t=${Date.now()}`}
                star_price={r.data.prize.star_price}
                stars={starToggle}
              />
            )
          );
        }, randomTimeout + 1000);
      }
    }
  };
  const [prizes, setPrizes] = useState([]);
  const [casePrizes, setCasePrizes] = useState([]);
  const [indexToScroll, setIndexToScroll] = useState(5);
  const [left, setLeft] = useState(0);

  const [bottom, setBottom] = useState(-77);

  const [randomOffset, setRandomOffset] = useState(0);

  const [isRolling, setIsRolling] = useState(false);

  const [claimButton, setClaimButton] = useState(null);

  const dispatch = useDispatch();

  const [randomTimeout, setRandomTimeout] = useState(0); // вместо undefined\

  const [demo, setDemo] = useState(false);
  const [starToggle, setStarToggle] = useState(false);

  const starToggleClick = (val) => {
    setStarToggle(val);
    const newCasePrizes = props.case.prizes.map((element) => {
      return {
        stars: starToggle,
        image: `https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
          element.prize_id
        }&t=${Date.now()}`,
        price: element.price,
        star_price: element.star_price,
      };
    });
    setCasePrizes(newCasePrizes);
  };
  const stars = useSelector((s) => s.user.stars);

  const getRollButtonText = () => {
    if (!starToggle) {
      if (isRolling) {
        return "Rolling...";
      }
      if (demo) {
        return "Roll demo";
      }
      if (balance < props.case.price) {
        return "Not enough money";
      }
      return `Roll for ${props.case.price} TON`;
    }
    if (starToggle) {
      if (isRolling) {
        return "Rolling...";
      }
      if (demo) {
        return "Roll demo";
      }
      if (stars < props.case.star_price) {
        return "Not enough stars";
      }
      return `Roll for ${props.case.star_price} stars`;
    }
  };

  useEffect(() => {
    //setRandomOffset(Math.random() * 60);
    //setRandomTimeout(Math.random() * 7 + 7); // от 7 до 14 секунд
    setLeft(-indexToScroll * 87 - 4 * (indexToScroll - 0.5)); // двигаем влево на 5 картинок и 4.5 промежутка, затем право на +50vw
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

  // Обновляем casePrizes при изменении props.prizes
  useEffect(() => {
    console.log(props.case.prizes);
    const newCasePrizes = props.case.prizes.map((element) => {
      return {
        stars: starToggle,
        image: `https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
          element.prize_id
        }&t=${Date.now()}`,
        price: element.price,
        star_price: element.star_price,
      };
    });
    setCasePrizes(newCasePrizes);
  }, [props.case.prizes]);

  // Когда casePrizes обновятся, создаём prizes
  useEffect(() => {
    if (casePrizes.length === 0) return;

    const length = 50 * casePrizes.length;
    let newPrizes = [];

    for (let i = 0; i < length; i++) {
      let random_prize_id = i % casePrizes.length; // getRandomInteger(0, casePrizes.length - 1);
      let random_prize_parameters = casePrizes[random_prize_id];
      newPrizes.push({
        key: "random-" + i,
        width: 87,
        height: 87,
        image: random_prize_parameters.image,
        price: random_prize_parameters.price,
        star_price: random_prize_parameters.star_price,
        stars: starToggle,
      });
    }
    // const mainPrize = possible_prizes_colors[props.prizeId];
    // const random_index = getRandomInteger(100, 200);
    setPrizes(newPrizes.slice());
    //     random_index,
    //     0,
    //     <div
    //       key="main-prize"
    //       className="rollbar-prize"
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
  }, [casePrizes, props.prizeId, starToggle]);

  useEffect(() => {
    setTimeout(() => {
      setBottom(0);
    }, 50);
  }, []);

  return (
    <div className="case-modal" style={{ bottom: `${bottom}vh` }}>
      <button
        className="modal-close"
        onClick={() => {
          setBottom(-77);
          dispatch(setBg(false));
          setTimeout(() => {
            dispatch(setModal(null));
          }, 550);
        }}
      >
        X
      </button>
      <h2 className="case-name">{props.case.name}</h2>
      <div className="rollblock">
        {/* <div className="selector"></div> */}
        <div className="rollbar-selector-top">
          <svg
            width="130"
            height="8"
            viewBox="0 0 130 8"
            fill={
              isRolling || balance < props.case.price ? "#ff2d55" : "#0088ff"
            }
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M128.5 0.5C129.052 0.5 129.5 0.947715 129.5 1.5C129.5 2.05228 129.052 2.5 128.5 2.5H68.2529L65.3662 7.5C64.9813 8.16667 64.0187 8.16667 63.6338 7.5L60.7471 2.5H1C0.447715 2.5 0 2.05228 0 1.5C0 0.947715 0.447715 0.5 1 0.5H128.5Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div
          className="rollbar"
          style={{
            left: `calc(${left}px + 50vw)`,
            transition: transition
              ? `left ${randomTimeout / 1000}s cubic-bezier(.38,.05,.06,1)`
              : `none`,
          }}
        >
          {prizes.map((el) => {
            const prize = (
              <Prize
                key={el.key}
                width={el.width}
                height={el.height}
                image={el.image}
                price={el.price}
                id={el.key}
                star_price={el.star_price}
                stars={el.stars}
              />
            );
            return prize;
          })}
        </div>
        <div className="rollbar-selector-bottom">
          <svg
            width="130"
            height="8"
            viewBox="0 0 130 8"
            fill={
              isRolling || balance < props.case.price ? "#ff2d55" : "#0088ff"
            }
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7.99999C0.447708 7.99999 3.91406e-08 7.55227 8.74229e-08 6.99999C1.35705e-07 6.4477 0.447708 5.99999 1 5.99999L60.5127 5.99999C60.5349 5.91539 60.5692 5.83144 60.6162 5.74999L63.6475 0.499994C64.0324 -0.166473 64.994 -0.166509 65.3789 0.499994L68.4102 5.74999C68.4571 5.83138 68.4905 5.91547 68.5127 5.99999L128.5 6C129.052 6 129.5 6.44772 129.5 7C129.5 7.55228 129.052 8 128.5 8L1 7.99999Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <button
        className="roll-button"
        disabled={demo ? isRolling : isRolling || balance < props.case.price}
        onClick={onCaseRoll}
      >
        {getRollButtonText()}
      </button>
      <div className="demo-block">
        <span>Demo Mode</span>
        <Toggle setDemo={setDemo} />
      </div>
      <div className="demo-block">
        <span>Roll Stars</span>
        <StarToggle setStarToggle={starToggleClick} />
      </div>
      <div className="case-prizes">
        <span className="case-possible-prizes-text">Possible prizes:</span>
        <div className="case-possible-prizes">
          {casePrizes.map((el, i) => {
            return (
              <Prize
                key={i}
                width={"calc((100% - 32px) / 3)"}
                height={""}
                image={el.image}
                price={el.price}
                star_price={el.star_price}
                stars={!el.stars}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
