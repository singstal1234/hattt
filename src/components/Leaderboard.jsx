import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import gift1 from "./assets/gift1.png";
import gift2 from "./assets/gift2.png";
import gift3 from "./assets/gift3.png";
import { useSelector } from "react-redux";

export default function Leaderboard() {
  const [cat, setCat] = useState(0);

  const [ld, setLd] = useState([]);
  const [my, setMy] = useState([]);
  const userId = useSelector((s) => s.user.telegramId);

  useEffect(() => {
    axios
      .get("https://singstal1234.pythonanywhere.com/refferal/leaderboard")
      .then(async (r) => {
        // Добавляем async здесь
        console.log(r);
        const newLd = [];

        // Используем Promise.all для ожидания всех запросов
        await Promise.all(
          r.data.map(async (el) => {
            try {
              const r2 = await axios.get(
                `https://singstal1234.pythonanywhere.com/photo/user_name?telegram_id=${el[0]}`
              );
              newLd.push({
                userId: el[0],
                refferalCount: el[1],
                name: r2.data,
              });
            } catch (e) {
              console.log(e);
            }
          })
        );
        console.log(newLd); // Теперь здесь будут все данные
        newLd.sort((el1, el2) => el2.refferalCount - el1.refferalCount);
        setLd(newLd); // Не забудьте обновить состояние
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://singstal1234.pythonanywhere.com/refferal/my?telegram_id=${userId}`
      )
      .then(async (r) => {
        // Добавляем async здесь
        console.log(r);
        const newLd = [];

        // Используем Promise.all для ожидания всех запросов
        await Promise.all(
          r.data.map(async (el) => {
            try {
              const r2 = await axios.get(
                `https://singstal1234.pythonanywhere.com/photo/user_name?telegram_id=${el}`
              );
              newLd.push({
                userId: el,
                name: r2.data,
              });
            } catch (e) {
              console.log(e);
            }
          })
        );

        console.log(newLd); // Теперь здесь будут все данные
        setMy(newLd); // Не забудьте обновить состояние
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // useEffect(() => {
  //   setId(window.Telegram.WebApp.initData.user.id);
  // }, window.Telegram.WebApp.initData.user);

  // useEffect(() => {
  //   console.log(window);
  //   console.log(window.Telegram);
  // }, []);

  const getGift = (i) => {
    if (i == 0) return gift1;
    if (i == 1) return gift2;
    if (i == 2) return gift3;
    return "";
  };

  return (
    <div className="ld">
      <div className="back">
        {/* <button
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "100000",
            opacity: "0",
          }}
          onClick={() => {
            props.onBack();
            console.log(13);
          }}
        ></button> */}
        <span>
          {/* <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 9C23.5523 9 24 8.55228 24 8C24 7.44772 23.5523 7 23 7L23 9ZM0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65686 0.92893L0.292893 7.29289ZM23 8L23 7L1 7L1 8L1 9L23 9L23 8Z"
              fill="white"
            />
          </svg> */}
          <span>Leaderboard</span>
        </span>
      </div>
      <div className="ld-wrapper">
        <div className="ld-head">
          <div className="images"></div>
          <div className="top-head">
            <span className="top-text">Refferals</span>
            <span className="top-subtext">The top 3 will receive prizes.</span>
          </div>
          <div className="ld-switch">
            <div
              className={`top100 ${cat == 0 ? "selected" : ""}`}
              onClick={() => setCat(0)}
            >
              Top 100
            </div>
            <div
              className={`my-refs ${cat == 1 ? "selected" : ""}`}
              onClick={() => setCat(1)}
            >
              My Refs
            </div>
          </div>
        </div>
        <div className="ld-tail">
          {cat == 0
            ? ld.map((el, i) => {
                return (
                  <div className="ld-row">
                    <div className="name-block">
                      <span className="row-no">{i + 1}</span>
                      <img
                        src={`https://singstal1234.pythonanywhere.com/photo/user?telegram_id=${el.userId}`}
                        alt=""
                        className="row-pfp"
                      />
                      <span className="username">{el.name}</span>
                    </div>
                    <div className="gift-block">
                      <span className="ref-count">{el.refferalCount}</span>
                      <div
                        className="gift"
                        style={{ background: `url(${getGift(i)})` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            : my.map((el, i) => {
                return (
                  <div className="ld-row">
                    <div className="name-block">
                      {/* <span className="row-no">{i + 1}</span> */}
                      <img
                        src={`https://singstal1234.pythonanywhere.com/photo/user?telegram_id=${el.userId}`}
                        alt=""
                        className="row-pfp"
                      />
                      <span className="username">{el.name}</span>
                    </div>
                    {/* <div
                    className="gift"
                    style={{ background: `url(${getGift(i)})` }}
                  ></div> */}
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
