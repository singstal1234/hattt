import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../store/slices/userSlice";
import "./cases.css";
import axios from "axios";
import { setBg, setModal } from "../../store/slices/modalSlice";
import CaseRollWindow from "./caseRollWindow";
import caseImg from "./../../assets/case1.png";
import { TonLogo } from "../common/Header";
import CaseModal from "../modals/caseModal";

export default function Cases() {
  const cases = useSelector((s) => s.case.cases);
  const balance = useSelector((s) => s.user.balance);
  const dispatch = useDispatch();

  return (
    <div className="cases">
      <h2 className="cases-title">Hot Case</h2>
      {cases.map((el) => {
        return (
          <div
            className="case"
            key={el["case_id"]}
            onClick={() => {
              dispatch(setModal(<CaseModal case={el} />));
              dispatch(setBg(true));
            }}
          >
            <div className="case-image">
              <img
                src={`http://127.0.0.1:8000/photo/case?case_id=${
                  el.case_id
                }&t=${Date.now()}`}
                alt=""
                srcset=""
              />
            </div>
            <div className="price-block">
              <div className="price-block-bg"></div>
              <div className="price">
                <span className="case-price">{el["price"]}</span>
                <TonLogo color={"white"} />
              </div>
            </div>
            <h3>{el["name"]}</h3>
            {/* <ul>
              {el["prizes"].map((e) => {
                return (
                  <li key={e["prize_id"]}>
                    <h4>{e["name"]}</h4>
                    <p>Цена: {e["price"]} TON</p>
                  </li>
                );
              })}
            </ul> */}
            {/* <button
              disabled={el["price"] > balance}
              onClick={() => {
                axios
                  .post("http://localhost:8000/case/open", {
                    case_id: el["case_id"],
                    user_id: 664664,
                  })
                  .then((r) => {
                    // alert(
                    //   `Вы выиграли приз ${r.data.prize.prize_id}. ${r.data.prize.name} за ${r.data.prize.price} TON!`
                    // );
                    const prize_ids = [];
                    for (let i = 0; i < el.prizes.length; i++) {
                      prize_ids.push(el.prizes[i].prize_id);
                    }
                    console.log(prize_ids);
                    dispatch(
                      setModal(
                        <CaseRollWindow
                          prizeId={r.data.prize.prize_id}
                          prizes={prize_ids}
                        />
                      )
                    );
                    // транзакция успешна
                    return axios.get(
                      `http://localhost:8000/balance/get/664664`
                    );
                  })
                  .then((r2) => {
                    console.log(r2);
                    dispatch(setBalance(r2.data));
                  })
                  .catch((e) => {
                    console.log(e);
                    if (e.response?.status === 400) {
                      alert("Недостаточно денег!");
                    } else {
                      alert("Ошибка при открытии кейса");
                    }
                  });
              }}
            >
              Купить за {el["price"]} TON
            </button> */}
          </div>
        );
      })}
    </div>
  );
}
