import React from "react";
import banner1 from "./../../assets/banner.png";
import "./events.css";
import Leaderboard from "../Leaderboard";

export default function Events() {
  return (
    <div className="events">
      <Leaderboard />
      {/* <h2 className="events-title">Active</h2>
      <img src={banner1} alt="" srcset="" className="event-banner" />
      <h2 className="events-title">Finished</h2>
      <img src={banner1} alt="" srcset="" className="event-banner" />
      <img src={banner1} alt="" srcset="" className="event-banner" /> */}
    </div>
  );
}
