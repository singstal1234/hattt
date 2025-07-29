import {
  THEME,
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import "./header.scss";
import { useSelector } from "react-redux";
import avatar from "./../../assets/avatar.jpg";

export const TonLogo = ({ color }) => {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 10 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 11C5.27261 11 8.04225 5.17359 9.33808 2.41548C9.64882 1.75407 9.16396 1 8.43319 1H5M5 11C4.72739 11 1.95775 5.17359 0.661922 2.41548C0.351176 1.75407 0.83604 1 1.56681 1H5M5 11V1"
        stroke={color}
      />
    </svg>
  );
};

export const Header = () => {
  const wallet = useTonWallet();
  const balance = useSelector((s) => s.user.balance);
  return (
    <header>
      <div className="header-logo">
        <h2 className="header-logo-text">Cool Case</h2>
      </div>

      <div className="header-info">
        <div className="user-block">
          <div className="user-pfp">
            <img src={avatar} alt="" srcset="" />
          </div>
          <span className="user-name">Anton</span>
        </div>
        <div className="ton-block">
          <div className="ton-button">
            <TonConnectButton
              style={{
                width: "130px",
                height: "26px",
                position: "absolute",
                opacity: "0",
              }}
            />
            {wallet == null ? "Connect Wallet" : "Manage wallet"}
          </div>
          <div className="balance-block">
            <span>{balance.toFixed(2)}</span>
            <TonLogo color={"white"} />
          </div>
        </div>
      </div>
      {/* <span>Balance: {balance.toFixed(3)} TON</span> */}
    </header>
  );
};
