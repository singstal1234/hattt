import React, { use, useEffect, useState } from "react";
import "./profile.css";
import avatar from "./../../assets/avatar.jpg";
import { TonLogo } from "../common/header.jsx";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../store/slices/userSlice";
import { messageToPayload } from "../../utils/ton-utils";
import axios from "axios";
import { address } from "@ton/core";

export default function Profile() {
  const [data, setData] = useState([]);
  const [isDepWindow, setIsDepWindow] = useState(false);
  const [cat, setCat] = useState(0);
  const [dep, setDep] = useState(1);
  const [wd, setWd] = useState(1);
  const [address, setAddress] = useState("");

  const balance = useSelector((s) => s.user.balance);
  const userId = useSelector((s) => s.user.telegramId);
  const prizes = useSelector((s) => s.case.prizes);

  useEffect(() => {
    axios
      .get(`https://singstal12345.pythonanywhere.com/balance/rolls/${userId}`)
      .then((r) => {
        if (r.data == null) {
          setData([]);
        } else {
          setData(r.data);
        }
      });
  }, []);

  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const tgId = useSelector((s) => s.user.telegramId);
  const dispatch = useDispatch();

  tonConnectUi.uiOptions = {
    twaReturnUrl: "https://t.me/durov",
  };

  return (
    <div className="profile">
      <h2 className="profile-title">Profile</h2>
      {!isDepWindow && (
        <>
          <div className="user-info">
            <img
              src={
                window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url ||
                avatar
              }
              alt=""
              srcset=""
            />
            <span>
              {window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ||
                "Hello!"}
            </span>
          </div>
          <div className="balance">
            <div className="balance-info">
              <span className="balance-text">Balance</span>
              <span className="balance-value">
                {balance} <TonLogo color={"white"} />
              </span>
            </div>
            <button
              className="balance-button1"
              onClick={() => {
                setIsDepWindow(true);
              }}
            >
              Deposit
            </button>
          </div>
        </>
      )}
      {isDepWindow && (
        <div className="deposit-withdraw">
          <div className="selectors">
            <button
              className={`selector1 ${cat == 0 ? "selected" : ""}`}
              onClick={() => setCat(0)}
            >
              <span>Deposit</span>
            </button>
            <button
              className={`selector1 ${cat == 1 ? "selected" : ""}`}
              onClick={() => setCat(1)}
            >
              Withdraw
            </button>
          </div>
          {cat == 0 ? (
            <>
              <span className="input-label">Amount to deposit</span>
              <input
                type="number"
                min={0}
                max={1000}
                defaultValue={1}
                className="amount-input"
                onChange={(e) => {
                  console.log(e.target.value);
                  if (parseFloat(e.target.value) < 0) {
                    e.target.value = 1;
                  } else {
                    setDep(parseFloat(e.target.value));
                  }
                }}
              />
              <button
                className="balance-button"
                disabled={wallet == null}
                onClick={() => {
                  if (wallet) {
                    const request = {
                      // The transaction is valid for 10 minutes from now, in unix epoch seconds.
                      validUntil: Math.floor(Date.now() / 1000) + 600,
                      messages: [
                        {
                          // The receiver's address.
                          address:
                            "UQBA330gs8oPzdVflBslXwhmbPpGnB4H2InxzjwTw-kgi_8J",
                          // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
                          amount: dep * 1_000_000_000,
                          // (optional) State initialization in boc base64 format.
                          stateInit:
                            "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
                          // (optional) Payload in boc base64 format.
                          payload: messageToPayload(tgId.toString()), // messageToPayload(tgId),
                        },
                      ],
                    };
                    tonConnectUi.sendTransaction(request).then(() => {
                      setTimeout(() => {
                        axios
                          .post(
                            "https://singstal12345.pythonanywhere.com/balance/check-update"
                          )
                          .then((_) => {
                            axios
                              .get(
                                `https://singstal12345.pythonanywhere.com/balance/get/${tgId}`
                              )
                              .then((r) => {
                                dispatch(setBalance(r.data));
                              })
                              .catch((e) => {
                                console.log(e);
                                alert(e);
                              });
                          });
                      }, 10000);
                    });
                  } else {
                    alert("Wallet not connected!");
                  }
                }}
              >
                {wallet == null ? "Connect wallet first" : "Deposit"}
              </button>
            </>
          ) : (
            <>
              {/* <div className="selectors">
                <button className="selector1" onClick={() => setCat(0)}>
                  Deposit
                </button>
                <button
                  className="selector1"
                  onClick={() => setCat(1)}
                  style={{ textDecoration: "underline" }}
                >
                  Withdraw
                </button>
              </div> */}
              <span className="input-label">Amount to withdraw</span>
              <input
                type="number"
                className="amount-input"
                defaultValue={1}
                onChange={(e) => {
                  console.log(e.target.value);
                  if (parseFloat(e.target.value) < 0) {
                    e.target.value = 1;
                  } else {
                    setWd(parseFloat(e.target.value));
                  }
                }}
              />
              <span className="input-label">TON Address</span>
              <input
                type="text"
                className="amount-input"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <button
                className="balance-button"
                disabled={wd > balance || wd < 0.2}
                onClick={() => {
                  console.log(123);
                  axios
                    .post(
                      "https://singstal12345.pythonanywhere.com/balance/withdraw",
                      {
                        user_id: tgId,
                        amount: wd,
                        address: address,
                      }
                    )
                    .then((r) => {
                      setBalance(balance - wd);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                {(() => {
                  if (wd < 0.2) return "Minimum 0.2 TON";
                  if (wd > balance) return "Not enough money";
                  return "Withdraw";
                })()}
              </button>
            </>
          )}
        </div>
      )}
      <div className="last-rolls">
        <h2 className="profile-title">Last drop</h2>

        {data.map((el) => {
          const prize = prizes.find((el) => el.prize_id == el[3]);
          return (
            <div
              key={el[0]}
              className="last-roll"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div
                className="text-block"
                style={{ alignItems: "center", alignContent: "center" }}
              >
                <img
                  src={`https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
                    el[3]
                  }&t=${Date.now()}`}
                  alt=""
                  srcset=""
                  style={{ width: 42, height: 42, borderRadius: "6px" }}
                />
                <span>{prize.name}</span>
              </div>
              <span
                className="price-block"
                style={{ alignItems: "center", alignContent: "center" }}
              >
                {prize.price} <TonLogo color={"white"} />
              </span>
            </div>
          );
        })}

        <div
          className="last-roll"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <div
            className="text-block"
            style={{ alignItems: "center", alignContent: "center" }}
          >
            <img
              src={avatar}
              alt=""
              srcset=""
              style={{ width: 42, height: 42, borderRadius: "6px" }}
            />
            <span>Name</span>
          </div>
          <span
            className="price-block"
            style={{ alignItems: "center", alignContent: "center" }}
          >
            123 <TonLogo color={"white"} />
          </span>
        </div>
      </div>
    </div>
  );
}
