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
  gasPower,
}: {
  gemInSecond: number;
  lastClaim: Date | null;
  address: string;
  isLoading?: boolean;
  gasPower: number;
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

      if (time >= 24 * 3600) {
        stop();
        setIsStart(false);
      }
    }
    setGem(lastClaim ? time * gemInSecond : 0);
  }, [lastClaim, start, restart, time, gemInSecond]);

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
    setGem(gem + gemInSecond);
  }, 1000);

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
        {isLoading ? (
          <Spinner size="m" />
        ) : (
          <>
            <h2>{isStart && !isLoading ? gem.toFixed(4) : "0"} GXP</h2>
            <p style={{ display: isStart && !isLoading ? "block" : "none" }}>
              {formatTime(hours)}h {formatTime(minutes)}m {formatTime(seconds)}s
            </p>
          </>
        )}
        <p className={styles.fontOrbitron}>
          {isStart ? "Time until the next reward" : "Reward is ready"}
        </p>
        <div className={styles.buttonContainer}>
          <div className={styles.border} />
          <button
            onClick={handleStart}
            style={{ minWidth: "200px" }}
            disabled={Boolean(lastClaim && time < 6 * 3600)}
          >
            {lastClaim
              ? time >= 6 * 3600
                ? "Claim"
                : "Mining..."
              : "Start mining"}
          </button>
          <div className={styles.border} />
        </div>
      </div>
      <div className={styles.descContainer}>
        <div className={styles.boxContainer}>
          <h4>{Number(gemInSecond * 3600).toFixed(2)} GXP</h4>
          <p className={styles.fontOrbitron}>Basic Rate</p>
        </div>
        <div className={styles.boxContainer}>
          <h4>{gasPower}%</h4>
          <p className={styles.fontOrbitron}>Boooster</p>
        </div>
      </div>
    </>
  );
};
