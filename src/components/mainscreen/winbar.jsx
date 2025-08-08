import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getRandomInt } from "../../utils/random";
import "./winbar.css";

export default function Winbar() {
  const allPrizes = useSelector((s) => s.case.prizes);
  const [prizes, setPrizes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  // Инициализация
  useEffect(() => {
    if (allPrizes.length > 0 && prizes.length === 0) {
      const initial = Array.from(
        { length: 13 },
        () => allPrizes[getRandomInt(0, allPrizes.length - 1)]
      );
      setPrizes(initial);
    }
  }, [allPrizes]);

  useEffect(() => {
    if (prizes.length === 0 || allPrizes.length === 0) return;

    const interval = setInterval(() => {
      if (isAnimating) return;

      const newPrize = allPrizes[getRandomInt(0, allPrizes.length - 1)];
      const updated = [...prizes, newPrize];

      setIsAnimating(true);

      const prizeWidth = containerRef.current?.children?.[0]?.offsetWidth || 0;
      const gap = 8;
      const shift = prizeWidth + gap;

      if (containerRef.current) {
        containerRef.current.style.transition = "transform 0.3s ease";
        containerRef.current.style.transform = `translateX(-${shift}px)`;
      }

      setTimeout(() => {
        setPrizes(updated.slice(1));
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = "translateX(0)";
        }
        setIsAnimating(false);
      }, 300);
    }, getRandomInt(2000, 3000));

    return () => clearInterval(interval);
  }, [prizes, allPrizes, isAnimating]);

  return (
    <div className="winbar-wrapper">
      <div className="winbar">
        <div className="winbar-live">
          <div className="live-circle"></div>
          <span className="live-text">Live</span>
        </div>
        <div className="winbar-prizes-wrapper">
          <div ref={containerRef} className="winbar-prizes">
            {prizes.map((prize, i) => (
              <div
                key={i}
                className="winbar-prize"
                style={{
                  backgroundImage: `url(https://singstal12345.pythonanywhere.com/photo/prize?prize_id=${
                    prize.prize_id
                  }&t=${Date.now()})`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
