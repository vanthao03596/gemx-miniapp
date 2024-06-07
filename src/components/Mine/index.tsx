import { useInterval } from "@/hooks/useInterval";
import useTimer from "@/hooks/useTimer";
import { Button } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import styles from "./mine.module.scss";

export const Mine = ({ gemInHour }: { gemInHour: number }) => {
  const gemInSecond = gemInHour / 3600;
  const [gem, setGem] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const { start, hours, minutes, seconds } = useTimer({
    expiryTimestamp: new Date().getTime() + 60 * 60 * 1000,
  });

  useInterval(
    () => {
      setGem(gem + gemInSecond * 3);
    },
    isStart ? 3000 : null
  );

  const formatTime = (time: number) => {
    return ("0" + time).slice(-2);
  };

  const handleStart = () => {
    start();
    setIsStart(true);
  };

  return (
    <>
      <div className={[styles.mineContainer, styles.boxContainer].join(" ")}>
        <h2>{isStart ? gem.toFixed(4) : "0"} GEM</h2>
        <p style={{ display: isStart ? "block" : "none" }}>
          {formatTime(hours)}h {formatTime(minutes)}m {formatTime(seconds)}s
        </p>
        <p>
          {isStart
            ? "Thời gian nhận phần thưởng tiếp theo"
            : "Phần thưởng đã sẵn sàng"}
        </p>
        <div className={styles.buttonContainer}>
          <Button size="m" mode="filled" onClick={handleStart}>
            Bắt đầu khai thác
          </Button>
        </div>
      </div>
      <div className={styles.descContainer}>
        <div className={styles.boxContainer}>
          <h4>1 GEM</h4>
          <p>Tốc độ khai thác cơ bản</p>
        </div>
        <div className={styles.boxContainer}>
          <h4>0%</h4>
          <p>Hệ số Booster</p>
        </div>
      </div>
    </>
  );
};
