import { useTimer } from "@/hooks/useTimer";
import { Button, Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import styles from "./mine.module.scss";

const expiresInSeconds = new Date().getTime() + 60 * 60 * 1000;

export const Mine = ({ gemInHour }: { gemInHour: number }) => {
  const gemInSecond = gemInHour / 3600;
  const [gem, setGem] = useState(0);
  const [start, setStart] = useState(false);
  const { seconds, minutes, hours } = useTimer({
    expiresInSeconds,
    start,
  });

  const handleStart = () => {
    setStart(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (start) {
        setGem(gem + gemInSecond * 3);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gem, gemInSecond, start]);

  const formatTime = (time: number) => {
    return ("0" + time).slice(-2);
  };

  return (
    <>
      <div className={[styles.mineContainer, styles.boxContainer].join(" ")}>
        <h2>{start ? gem.toFixed(4) : "0"} GEM</h2>
        <p style={{ display: start ? "block" : "none" }}>
          {formatTime(hours)}h {formatTime(minutes)}m {formatTime(seconds)}s
        </p>
        <p>
          {start
            ? "Thời gian nhận phần thưởng tiếp theo"
            : "Phần thưởng đã sẵn sàng"}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            size="m"
            mode="filled"
            onClick={handleStart}
            after={start ? <Spinner size="s" /> : null}
          >
            {start ? "Đang khai thác" : "Bắt đầu khai thác"}
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
