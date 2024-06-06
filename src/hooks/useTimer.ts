import { useState } from "react";
import { useInterval } from "./useInterval";

export const useTimer = (props: {
  expiresInSeconds: number;
  start: boolean;
}) => {
  const { expiresInSeconds, start } = props;
  const [seconds, setSeconds] = useState(
    getSecondsFromExpiry(expiresInSeconds)
  );

  useInterval(
    () => {
      setSeconds(getSecondsFromExpiry(expiresInSeconds));
    },
    start ? 1000 : null
  );

  return {
    seconds: Math.floor(seconds % 60),
    minutes: Math.floor((seconds % (60 * 60)) / 60),
    hours: Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)),
    days: Math.floor(seconds / (60 * 60 * 24)),
  };
};

const getSecondsFromExpiry = (expire: number) =>
  Math.round((expire - new Date().getTime()) / 1000);
