import { CustomHeader } from '@/components/CustomHeader';
import { MaterialSymbolsCheckRounded } from '@/icon/icon';
import { Badge, Cell, Section, Text, Title } from '@telegram-apps/telegram-ui';
import { useSearchParams } from 'react-router-dom';
import styles from './WalletHistoryPage.module.scss';

const histories = [
    {
        title: 'Daily reward',
        date: '11:05 24/05/2024',
        amount: 20,
        unit: 'GEMXXXXX',
    },
    {
        title: 'Daily reward',
        date: '11:05 24/05/2024',
        amount: 20,
        unit: 'GEM',
    },
    {
        title: 'Daily reward',
        date: '11:05 24/05/2024',
        amount: 20,
        unit: 'GEM',
    },
    {
        title: 'Daily reward',
        date: '11:05 24/05/2024',
        amount: 20,
        unit: 'GEM',
    },
    {
        title: 'Daily reward',
        date: '11:05 24/05/2024',
        amount: 20,
        unit: 'GEM',
    },
];

const WalletHistoryPage = () => {
    const [searchParams] = useSearchParams();
    const unit = searchParams.get('unit')?.trim();

    return (
        <div className={styles.container}>
            {/* Title */}
            <CustomHeader title={unit ? unit + ' balance' : 'list'} hasBack />

            {/* Balance */}
            {unit && (
                <div className={styles.balance}>
                    <Title level='1' weight='2' className={styles.amountText}>
                        134456
                    </Title>

                    <Title level='2' weight='2' caps className={styles.historyText}>
                        History
                    </Title>
                </div>
            )}

            {/* History */}
            <Section className={styles.section}>
                {histories.map((item, index) => (
                    <Cell
                        after={
                            <div className={styles.cellAfter}>
                                <div className={styles.left}>
                                    <Badge type='number' className={styles.amount}>
                                        +{item.amount}
                                    </Badge>
                                    <Text className={styles.unit}>{item.unit}</Text>
                                </div>
                            </div>
                        }
                        before={<MaterialSymbolsCheckRounded fontSize={24} className={styles.icon} />}
                        description={item.date}
                        key={index}
                    >
                        <Text>{item.title}</Text>
                    </Cell>
                ))}
            </Section>
        </div>
    );
};

export default WalletHistoryPage;
