import { CustomHeader } from '@/components/CustomHeader';
import { Link } from '@/components/Link/Link';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import {
    BitcoinIconsReceiveOutline,
    BitcoinIconsSendOutline,
    MaterialSymbolsLightChevronRightRounded,
    MaterialSymbolsLightHistoryRounded,
} from '@/icon/icon';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Cell, Divider, IconButton, Section, Text, Title } from '@telegram-apps/telegram-ui';
import React from 'react';
import styles from './WalletPage.module.scss';
import IMAGES from '@/assets/images';

type WalletUnit = 'gxp' | 'gp' | 'gemx' | 'usdt';
export type WalletBalanceResponse = Record<WalletUnit, number>;

const actions = [
    {
        icon: <BitcoinIconsSendOutline fontSize={32} />,
        text: 'Send',
        link: '/wallet/send',
    },
    {
        icon: <BitcoinIconsReceiveOutline fontSize={32} />,
        text: 'Receive',
        link: '/wallet/receive',
    },
    {
        icon: <MaterialSymbolsLightHistoryRounded fontSize={32} />,
        text: 'History',
        link: '/wallet/history',
    },
];

const WalletPage = () => {
    const axiosAuth = useAxiosAuth();

    const getBalance = async () => {
        const res = await axiosAuth.get<WalletBalanceResponse>('/wallet/balance');
        return res.data;
    };

    const { data: dataBalances } = useQuery({
        queryKey: ['get-balance'],
        queryFn: getBalance,
    });

    const balances = [
        {
            image: IMAGES.usdt,
            name: 'GXP',
            description: 'GEMX POINT',
            amount: dataBalances?.gxp,
            link: '/wallet/history?unit=gxp',
        },
        {
            image: IMAGES.usdt,
            name: 'GPAY',
            description: 'GEMX PAY',
            amount: dataBalances?.gp,
            link: '/wallet/history?unit=gp',
        },
        {
            image: IMAGES.usdt,
            name: 'GEMX',
            description: 'GEMX TOKEN',
            amount: dataBalances?.gemx,
            link: '/wallet/history?unit=gemx',
        },
        {
            image: IMAGES.usdt,
            name: 'USDT',
            description: 'USDT',
            amount: dataBalances?.usdt,
            link: '/wallet/history?unit=usdt',
        },
    ];

    return (
        <div className={styles.container}>
            {/* Title */}
            <CustomHeader title={'Wallet'} />

            {/* Action */}
            <div className={styles.action}>
                <div className={styles.group}>
                    {actions.map((item, index) => (
                        <div className={styles.item} key={index}>
                            <Link to={item.link}>
                                <IconButton mode='bezeled' className={styles.icon}>
                                    {item.icon}
                                </IconButton>
                            </Link>
                            <Text>{item.text}</Text>
                        </div>
                    ))}
                </div>
            </div>

            {/* Balance */}
            <div className={styles.balance}>
                <Title level='2' weight='2' caps className={styles.title}>
                    Balance
                </Title>
                <Section className={styles.section}>
                    {balances.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link to={item.link} state={{ amount: item.amount }}>
                                <Cell
                                    after={
                                        <div className={styles.badge}>
                                            <Badge type='number'>{item.amount}</Badge>
                                            <MaterialSymbolsLightChevronRightRounded
                                                fontSize={32}
                                                className={styles.chevron}
                                            />
                                        </div>
                                    }
                                    before={<Avatar src={item.image} size={48} />}
                                    description={item.description}
                                    className={styles.cell}
                                >
                                    <Text className={styles.text}>{item.name}</Text>
                                </Cell>
                            </Link>
                            <Divider />
                        </React.Fragment>
                    ))}
                </Section>
            </div>
        </div>
    );
};

export default WalletPage;
