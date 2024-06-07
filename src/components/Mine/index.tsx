import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useInterval } from "@/hooks/useInterval";
import useTimer from "@/hooks/useTimer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import dayjs from "../../lib/dayjs";
import styles from "./mine.module.scss";

export const Mine = ({
  gemInSecond,
  lastClaim,
  address,
  isLoading,
}: {
  gemInSecond: number;
  lastClaim: Date | null;
  address: string;
  isLoading?: boolean;
}) => {
  const axiosAuth = useAxiosAuth();

  const createLastClaim = async () => {
    const { data } = await axiosAuth.post("/claim-reward", address);
    return data;
  };

  const [gem, setGem] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const { start, restart, hours, minutes, seconds } = useTimer({
    expiryTimestamp: lastClaim ? dayjs.utc(lastClaim).add(6, "hours") : null,
  });
  const currentDate = new Date();
  const time = dayjs.utc(currentDate).diff(dayjs.utc(lastClaim), "seconds");
  const queyrClient = useQueryClient();

  useEffect(() => {
    if (lastClaim) {
      restart();
      start();
      setIsStart(true);
    }
  }, [lastClaim, start, restart, time]);

  const createLastClaimMuation = useMutation({
    mutationFn: createLastClaim,
    onSuccess: (data) => {
      console.log(data);
      queyrClient.invalidateQueries({ queryKey: ["last-claim"] });
    },
    onError: (e: Error) => {
      console.log(e);
    },
  });

  useInterval(() => {
    setGem(lastClaim ? time * gemInSecond : gem + gemInSecond * 3);
  }, 3000);

  const formatTime = (time: number) => {
    return ("0" + time).slice(-2);
  };

  const handleStart = () => {
    start();
    setIsStart(true);
    createLastClaimMuation.mutate();
  };

  return (
    <>
      <div className={[styles.mineContainer, styles.boxContainer].join(" ")}>
        <>{time}</>
        {isLoading ? (
          <Spinner size="m" />
        ) : (
          <>
            <h2>{isStart ? gem.toFixed(4) : "0"} GEM</h2>
            <p style={{ display: isStart && !isLoading ? "block" : "none" }}>
              {formatTime(hours)}h {formatTime(minutes)}m {formatTime(seconds)}s
            </p>
          </>
        )}
        <p>
          {isStart
            ? "Thời gian nhận phần thưởng tiếp theo"
            : "Phần thưởng đã sẵn sàng"}
        </p>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleStart}
            style={{ minWidth: "200px" }}
            disabled={Boolean(lastClaim && time < 6 * 3600)}
          >
            {lastClaim
              ? time >= 6 * 3600
                ? "Nhận"
                : "Đang khai thác"
              : "Bắt đầu khai thác"}
          </button>
        </div>
      </div>
      <div className={styles.descContainer}>
        <div className={styles.boxContainer}>
          <h4>{Number(gemInSecond * 3600).toFixed(2)} GEM</h4>
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
