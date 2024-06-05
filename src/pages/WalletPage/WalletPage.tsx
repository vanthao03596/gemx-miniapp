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
import { Avatar, Badge, Cell, Divider, IconButton, List, Text, Title } from '@telegram-apps/telegram-ui';
import styles from './WalletPage.module.scss';
import React from 'react';

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
        image: '',
        name: 'GXP',
        description: 'GEMX POINT',
        amount: 20,
        link: '/wallet/history?unit=gpx',
    },
    {
        image: '',
        name: 'GP',
        description: 'GEMX PAY',
        amount: 5,
        link: '/wallet/history?unit=gp',
    },
    {
        image: '',
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
            <Title level='2' weight='2' className={styles.title}>
                Wallet
            </Title>

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
                            <Text className={styles.text}>{item.text}</Text>
                        </div>
                    ))}
                </div>
            </div>

            {/* Balance */}
            <div className={styles.balance}>
                <Title level='3' weight='2' className={styles.title}>
                    Balance
                </Title>
                <Divider />
                <List>
                    {balances.map((item, index) => (
                        <React.Fragment key={index}>
                            <Link to={item.link}>
                                <Cell
                                    after={
                                        <div className={styles.badge}>
                                            <Badge type='number'>{item.amount}</Badge>
                                            <MaterialSymbolsLightChevronRightRounded fontSize={32} />
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
                </List>
            </div>
        </div>
    );
};

export default WalletPage;
