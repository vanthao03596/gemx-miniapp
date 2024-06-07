import dayjs from "dayjs";
import useCountdown from "./useCountdown";

interface TimerOption {
  expiryTimestamp: dayjs.ConfigType;
  onFinish?(): void;
}

/**
 * interface with default value
 *
 * @param  {TimerOption} timerOption
 * @param  {number} expiryTimestamp.expiryTimestamp - the timestamp expiry number.
 * @param  {?boolean} expiryTimestamp.isIncrement - `false` by default, true if the countdown is increment.
 * @returns [counter, CountdownControllers]
 */
export default function useTimer(timerOption: TimerOption) {
  const { expiryTimestamp: expiry, onFinish } = timerOption;
  const [seconds, { resetCountdown, startCountdown, stopCountdown }] =
    useCountdown({
      countStop: 0,
      countStart: getSecondsFromExpiry(dayjs(expiry).valueOf()),
      onFinish,
    });

  return {
    ...getTimeFromSeconds(seconds),
    start: startCountdown,
    stop: stopCountdown,
    restart: resetCountdown,
  };
}

const getSecondsFromExpiry = (expiry: number, shouldRound?: boolean) => {
  const now = new Date().getTime();

  const milliSecondsDistance = expiry - now;
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000;
    return shouldRound ? Math.round(val) : val;
  }
  return 0;
};

const getTimeFromSeconds = (secs: number) => {
  const totalSeconds = Math.ceil(secs);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
  };
};
