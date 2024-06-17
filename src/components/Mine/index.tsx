import useAxiosAuth from '@/hooks/useAxiosAuth';
import useTimer from '@/hooks/useTimer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IconButton, Link, Spinner } from '@telegram-apps/telegram-ui';
import { useEffect, useState } from 'react';
import dayjs from '../../lib/dayjs';
import styles from './mine.module.scss';
import { Button } from 'antd-mobile';
import { TablerRocket } from '@/icon/icon';

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
        const { data } = await axiosAuth.post('/claim-reward', address);
        return data;
    };

    const [isStart, setIsStart] = useState(false);
    const { start, restart, hours, minutes, seconds } = useTimer({
        expiryTimestamp: lastClaim ? dayjs.utc(lastClaim).add(6, 'hours') : null,
    });
    const currentDate = new Date();
    const time = dayjs.utc(currentDate).diff(dayjs.utc(lastClaim), 'seconds');

    const queyrClient = useQueryClient();

    useEffect(() => {
        if (lastClaim) {
            if (time >= 86400) {
                stop();
                setIsStart(false);
            } else {
                restart();
                start();
                setIsStart(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastClaim, time, gemInSecond]);

    const createLastClaimMuation = useMutation({
        mutationFn: createLastClaim,
        onSuccess: (data) => {
            console.log(data);
            queyrClient.invalidateQueries({ queryKey: ['last-claim'] });
        },
        onError: (e: Error) => {
            console.log(e);
        },
    });

    // useInterval(() => {
    //   setGem(gem + gemInSecond);
    // }, isStart ? 1000 : null);

    const formatTime = (time: number) => {
        return ('0' + time).slice(-2);
    };

    const handleStart = () => {
        start();
        setIsStart(true);
        createLastClaimMuation.mutate();
    };

    return (
        <>
            <div className={[styles.mineContainer, styles.boxContainer].join(' ')}>
                {isLoading ? (
                    <Spinner size='m' />
                ) : (
                    <>
                        {!lastClaim ? (
                            <h2>0 GXP</h2>
                        ) : time >= 86400 ? (
                            <h2>{(86400 * gemInSecond).toFixed(4)} GXP</h2>
                        ) : (
                            <h2>{isStart && !isLoading ? (time * gemInSecond).toFixed(4) : '0'} GXP</h2>
                        )}
                        <p style={{ display: isStart && !isLoading ? 'block' : 'none' }}>
                            {formatTime(hours)}h {formatTime(minutes)}m {formatTime(seconds)}s
                        </p>
                    </>
                )}
                <p className={styles.fontOrbitron}>{isStart ? 'Time until the next reward' : 'Reward is ready'}</p>
                <div className={styles.buttonContainer}>
                    <div className={styles.border} />

                    <Button
                        disabled={Boolean(lastClaim && time < 6 * 3600)}
                        loading={createLastClaimMuation.isPending}
                        onClick={handleStart}
                        style={{ minWidth: '200px' }}
                        color='primary'
                    >
                        {lastClaim ? (time >= 6 * 3600 ? 'Claim' : 'Mining...') : 'Start mining'}
                    </Button>

                    {/* <button
            onClick={handleStart}
            style={{ minWidth: "200px" }}
            disabled={Boolean(lastClaim && time < 6 * 3600)}
          >
            {lastClaim
              ? time >= 6 * 3600
                ? "Claim"
                : "Mining..."
              : "Start mining"}
          </button> */}
                    <div className={styles.border} />
                </div>
            </div>
            <div className={styles.descContainer}>
              
                <div className={styles.boxContainer}>
                    <h4>{Number(gemInSecond * 3600).toFixed(2)} GXP</h4>
                    <p className={styles.fontOrbitron}>Basic Rate</p>
                </div>

                <div className={styles.boxContainer}>
                    <h4>{gasPower}</h4>
                    <div className={styles.booster}>
                        <div className={styles.text}>Booster</div>
                        <Link href='https://gemx.io/membership' target='blank'>
                            <IconButton mode='bezeled' size='s'>
                                <TablerRocket />
                            </IconButton>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
