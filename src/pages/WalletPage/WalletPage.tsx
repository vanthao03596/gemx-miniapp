import { CustomHeader } from '@/components/CustomHeader';
import { Link } from '@/components/Link/Link';
import {
    BitcoinIconsReceiveOutline,
    BitcoinIconsSendOutline,
    MaterialSymbolsLightAttachMoneyRounded,
    MaterialSymbolsLightChevronRightRounded,
    MaterialSymbolsLightHistoryRounded,
    MaterialSymbolsLightRocketLaunchOutlineRounded,
    MaterialSymbolsLightSavingsOutlineRounded,
} from '@/icon/icon';
import { Avatar, Badge, Cell, Divider, IconButton, Section, Text, Title } from '@telegram-apps/telegram-ui';
import React from 'react';
import styles from './WalletPage.module.scss';

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
    {
        icon: <MaterialSymbolsLightAttachMoneyRounded fontSize={32} />,
        text: 'Withdraw',
        link: '/wallet/withdraw',
    },
    {
        icon: <MaterialSymbolsLightSavingsOutlineRounded fontSize={32} />,
        text: 'Saving',
        link: '/wallet/saving',
    },
    {
        icon: <MaterialSymbolsLightRocketLaunchOutlineRounded fontSize={32} />,
        text: 'Airdrop',
        link: '/wallet/airdrop',
    },
];

const balances = [
    {
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        name: 'GXP',
        description: 'GEMX POINT',
        amount: 20,
        link: '/wallet/history?unit=gpx',
    },
    {
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        name: 'GP',
        description: 'GEMX PAY',
        amount: 5,
        link: '/wallet/history?unit=gp',
    },
    {
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        name: 'GEMX',
        description: 'GEMX TOKEN',
        amount: 10,
        link: '/wallet/history?unit=gemx',
    },
];

const WalletPage = () => {
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
                            <Link to={item.link}>
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
