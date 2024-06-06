import { useInterval } from "@/hooks/useInterval";
import { Button, Spinner } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import styles from "./mine.module.scss";

export const Mine = ({ gemInHour }: { gemInHour: number }) => {
  // const expires = 30 * 1000;
  const gemInSecond = gemInHour / 3600;
  const [gem, setGem] = useState(0);
  const [start, setStart] = useState(false);
  // const [expiresInSeconds, setExpiresInSeconds] = useState<number>(
  //   new Date().getTime() + 60 * 60 * 1000
  // );

  // useEffect(() => {
  //   if (start) {
  //     setExpiresInSeconds(new Date().getTime() + expires);
  //   }
  // }, [start, expires]);

  // const { seconds, minutes, hours } = useTimer({
  //   expiresInSeconds,
  //   start,
  // });

  useInterval(
    () => {
      setGem(gem + gemInSecond * 3);
    },
    start ? 3000 : null
  );

  // const formatTime = (time: number) => {
  //   return ("0" + time).slice(-2);
  // };

  return (
    <>
      <div className={[styles.mineContainer, styles.boxContainer].join(" ")}>
        <h2>{start ? gem.toFixed(4) : "0"} GEM</h2>
        {/* <p style={{ display: start ? "block" : "none" }}>
          {formatTime(hours)}h {formatTime(minutes)}m {formatTime(seconds)}s
        </p> */}
        <p>
          {start
            ? "Thời gian nhận phần thưởng tiếp theo"
            : "Phần thưởng đã sẵn sàng"}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            size="m"
            mode="filled"
            onClick={() => setStart(!start)}
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
