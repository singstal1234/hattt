import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import React, { useState } from "react";
import { messageToPayload } from "../../utils/ton-utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBalance } from "../../store/slices/userSlice";

export default function Deposit() {
  const [depositSum, setDepositSum] = useState(1);
  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const tgId = useSelector((s) => s.user.telegramId);
  const dispatch = useDispatch();

  tonConnectUi.uiOptions = {
    twaReturnUrl: "https://t.me/durov",
  };

  return (
    <div className="deposit-page">
      <h2>Deposit</h2>
      <input
        type="number"
        min={0.001}
        max={500}
        onChange={(e) => {
          const val = parseFloat(e.target.value);
          if (val > 0) {
            setDepositSum(val);
          }
        }}
      />
      <button
        onClick={() => {
          if (wallet) {
            const request = {
              // The transaction is valid for 10 minutes from now, in unix epoch seconds.
              validUntil: Math.floor(Date.now() / 1000) + 600,
              messages: [
                {
                  // The receiver's address.
                  address: "0QDizxkJIefhWv8PBXAEu3R1QZiZuruS5hNqckwvDnzd7HmK",
                  // Amount to send in nanoTON. For example, 0.005 TON is 5000000 nanoTON.
                  amount: depositSum * 1_000_000_000,
                  // (optional) State initialization in boc base64 format.
                  stateInit:
                    "te6cckEBBAEAOgACATQCAQAAART/APSkE/S88sgLAwBI0wHQ0wMBcbCRW+D6QDBwgBDIywVYzxYh+gLLagHPFsmAQPsAlxCarA==",
                  // (optional) Payload in boc base64 format.
                  payload: messageToPayload(tgId), // messageToPayload(tgId),
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
            alert("Сначала подключи кошелёк, имбицила кусок!!!!");
          }
        }}
      >{`Депнуть ${depositSum} TON`}</button>
    </div>
  );
}
