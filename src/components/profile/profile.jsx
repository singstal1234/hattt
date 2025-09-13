import React, { use, useEffect, useState } from "react";
import "./profile.css";
import avatar from "./../../assets/avatar.jpg";
import { StarLogo, TonLogo } from "../common/header.jsx";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../store/slices/userSlice";
import { messageToPayload } from "../../utils/ton-utils";
import axios from "axios";
import { address } from "@ton/core";

export default function Profile() {
  const [refs, setRefs] = useState(0);
  const [reward, setReward] = useState(0);
  const getLevel = (refs) => {
    if (refs >= 200) return 10;
    if (refs >= 150) return 9;
    if (refs >= 100) return 8;
    if (refs >= 75) return 7;
    if (refs >= 50) return 6;
    if (refs >= 30) return 5;
    if (refs >= 20) return 4;
    if (refs >= 10) return 3;
    if (refs >= 5) return 2;
    if (refs >= 1) return 1;
    return 0;
  };
  const getPercentage = (refs) => {
    if (refs >= 200) return 30;
    if (refs >= 150) return 27;
    if (refs >= 100) return 24;
    if (refs >= 75) return 20;
    if (refs >= 50) return 16;
    if (refs >= 30) return 12;
    if (refs >= 20) return 8;
    if (refs >= 10) return 5;
    if (refs >= 5) return 3;
    if (refs >= 1) return 1;
    return 0;
  };
  const getMaxRefs = (refs) => {
    if (refs >= 200) return -1;
    if (refs >= 150) return 200;
    if (refs >= 100) return 150;
    if (refs >= 75) return 100;
    if (refs >= 50) return 75;
    if (refs >= 30) return 50;
    if (refs >= 20) return 30;
    if (refs >= 10) return 20;
    if (refs >= 5) return 10;
    if (refs >= 1) return 5;
    return 1;
  };

  const [data, setData] = useState([]);
  const [isDepWindow, setIsDepWindow] = useState(false);
  const [isStarWindow, setIsStarWindow] = useState(false);

  const [cat, setCat] = useState(0);
  const [dep, setDep] = useState(1);
  const [st, setSt] = useState(1);
  const [wd, setWd] = useState(1);
  const [address, setAddress] = useState("");

  const balance = useSelector((s) => s.user.balance);
  const stars = useSelector((s) => s.user.stars);
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
    axios
      .get(`https://singstal12345.pythonanywhere.com/refferal/count/${userId}`)
      .then((r) => {
        setRefs(r.data);
      });
    axios
      .get(`https://singstal12345.pythonanywhere.com/balance/reward/${userId}`)
      .then((r) => {
        setReward(r.data);
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
          <div className="profile-info">
            <div
              className="user-info"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
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

            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "9px",
                  marginBottom: "5px",
                }}
              >
                <span>
                  Refs: {refs}
                  {getMaxRefs(refs) == -1 ? "" : `/${getMaxRefs(refs)}`}
                </span>
                <span>Lvl: {getLevel(refs)}</span>
              </div>
              <div
                style={{
                  backgroundColor: "#000",
                  height: "20px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width:
                      getLevel(refs) == 10
                        ? "100%"
                        : `${(refs / getMaxRefs(refs)) * 100}%`,
                    backgroundColor: "#6c63ff",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "40px",
                gap: "20px",
              }}
            >
              {/* Referrals */}
              <div
                style={{
                  backgroundColor: "#000",
                  borderRadius: "20px",
                  padding: "20px",
                  flex: 1,
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                  Referrals
                </div>
                <div style={{ fontSize: "11px", marginBottom: "10px" }}>
                  Your referrals: {refs}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {reward} TON
                </div>
                <button
                  className="claim-button1"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  disabled={reward <= 0.000001}
                  onClick={() => {
                    axios
                      .post(
                        `https://singstal12345.pythonanywhere.com/balance/claim/${userId}`
                      )
                      .then((r) => {
                        dispatch(setBalance(balance + reward));
                        setReward(0);
                      });
                  }}
                >
                  Claim
                </button>
              </div>

              {/* Total Earned */}
              {/* <div
                style={{
                  backgroundColor: "#000",
                  borderRadius: "20px",
                  padding: "20px",
                  flex: 1,
                  flexGrow: 1,
                }}
              >
                <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                  Total Earned
                </div>
                <div style={{ fontSize: "px", fontWeight: "bold" }}>
                  4332 Ton
                </div>
              </div> */}

              {/* Referral Rank */}
              <div
                style={{
                  backgroundColor: "#000",
                  borderRadius: "10px",
                  padding: "20px",
                  flex: 1,
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                  Referral Rank
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {getPercentage(refs)}%
                </div>
                <a
                  href="https://t.me/HatCase_Official"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  More Info
                </a>
              </div>
            </div>
          </div>
          <div className="balance">
            <div className="balance-info">
              <span className="balance-text">Balance</span>
              <span className="balance-value">
                {balance.toFixed(3)} <TonLogo color={"white"} />
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
          <div className="balance">
            <div className="balance-info">
              <span className="balance-text">Balance</span>
              <span className="balance-value">
                {stars} <StarLogo />
              </span>
            </div>
            <button
              className="balance-button1"
              onClick={() => {
                setIsStarWindow(true);
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
      {isStarWindow && (
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
                  if (parseInt(e.target.value) < 0) {
                    e.target.value = 1;
                  } else {
                    setSt(parseInt(e.target.value));
                  }
                }}
              />
              <button
                className="balance-button"
                onClick={() => {
                  axios
                    .post(
                      `https://singstal12345.pythonanywhere.com/balance/star-invoice`,
                      {
                        user_id: tgId,
                        amount: st,
                      }
                    )
                    .then((r) => {
                      window.open(r.data);
                    })
                    .catch((e) => console.log(e));
                }}
              >
                {"Deposit"}
              </button>
              <span className="input-label" style={{ color: "gray" }}>
                You may need to reload app after deposit
              </span>
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
              <span className="input-label">Temporarly unavailable</span>
              {/* <span className="input-label">Amount to withdraw</span>
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
                    .post("https://singstal12345.pythonanywhere.com/balance/withdraw", {
                      user_id: tgId,
                      amount: wd,
                      address: address,
                    })
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
              </button> */}
            </>
          )}
        </div>
      )}
      <div className="last-rolls">
        <h2 className="profile-title">Last drop</h2>

        {data.map((el) => {
          const prize = prizes.find((el1) => el1.prize_id == el[3]);
          console.log(prize);
          console.log(prizes);
          if (prize == null || prize == undefined) return <></>;

          return (
            <div
              key={el[0]}
              className="last-roll"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div
                className="text-block"
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  gap: 4,
                }}
              >
                <img
                  src={`https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
                    el[3]
                  }&t=${Date.now()}`}
                  alt=""
                  srcset=""
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "6px",
                    // transform: "scale(1.04)",
                    // overflow: "hidden",
                  }}
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

        {/* <div
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
        </div> */}
      </div>
      <div className="buttons1">
        <a className="button1" href="https://t.me/HatCase_Official">
          Community
        </a>
        <a
          className="button2"
          href={`https://t.me/share/url?url=${`https://t.me/HatCase_bot?start=${btoa(
            userId.toString()
          )}`}&text=Follow my refferal link!`}
        >
          Share
        </a>
      </div>
    </div>
  );
}
