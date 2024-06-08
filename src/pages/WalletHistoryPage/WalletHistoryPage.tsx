import { CustomHeader } from '@/components/CustomHeader';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import usePageSize from '@/hooks/usePageSize';
import { MaterialSymbolsCheckRounded } from '@/icon/icon';
import { useQuery } from '@tanstack/react-query';
import { Badge, Cell, Section, Text, Title } from '@telegram-apps/telegram-ui';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { WalletBalanceResponse } from '../WalletPage/WalletPage';
import styles from './WalletHistoryPage.module.scss';

interface TransactionsData {
    id: number;
    wallet_id: number;
    transactionable_type: string;
    transactionable_id: number;
    amount: string;
    extra_type: string;
    created_at: Date;
    updated_at: Date;
}

interface TransactionsResponse {
    current_page: number;
    data: TransactionsData[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
}

const WalletHistoryPage = () => {
    const [searchParams] = useSearchParams();
    const unit = searchParams.get('unit')?.trim();
    const { page, handleChangePageSize } = usePageSize();
    const axiosAuth = useAxiosAuth();

    const getBalance = async () => {
        const res = await axiosAuth.get<WalletBalanceResponse>('/wallet/balance');
        return res.data;
    };

    const { data: dataBalances } = useQuery({
        queryKey: ['get-balance'],
        queryFn: getBalance,
    });

    const getTransactions = async () => {
        const url = `wallet/transaction?wallet=${unit}&page=${page}`;
        const res = await axiosAuth.get<TransactionsResponse>(url);
        return res.data;
    };

    const { data: dataTransactions } = useQuery({
        queryKey: ['get-transactions', unit, page],
        queryFn: getTransactions,
    });

    return (
        <div className={styles.container}>
            {/* Title */}
            <CustomHeader title={unit ? unit + ' balance' : 'list'} hasBack />

            {/* Balance */}
            {unit && (
                <div className={styles.balance}>
                    {dataBalances && (
                        <Title level='1' weight='2' className={styles.amountText}>
                            {dataBalances[unit as keyof WalletBalanceResponse]}
                        </Title>
                    )}

                    <Title level='2' weight='2' caps className={styles.historyText}>
                        History
                    </Title>
                </div>
            )}

            {/* History */}
            <Section className={styles.section}>
                {dataTransactions?.data.map((item, index) => (
                    <Cell
                        after={
                            <div className={styles.cellAfter}>
                                <div className={styles.left}>
                                    <Badge type='number' className={styles.amount}>
                                        +{item.amount}
                                    </Badge>
                                    <Text className={styles.unit} caps>
                                        {unit}
                                    </Text>
                                </div>
                            </div>
                        }
                        before={<MaterialSymbolsCheckRounded fontSize={24} className={styles.icon} />}
                        description={dayjs(item.created_at).format('HH:mm MM/DD/YYYY ')}
                        key={index}
                    >
                        <Text caps>{item.transactionable_type}</Text>
                    </Cell>
                ))}
            </Section>

            {/* Pagination */}
            {dataTransactions && (
                <div className={styles.pagination}>
                    <CustomPagination
                        pageNumber={dataTransactions.current_page}
                        totalPages={dataTransactions.last_page}
                        handlePageChange={handleChangePageSize}
                    />
                </div>
            )}
        </div>
    );
};

export default WalletHistoryPage;
