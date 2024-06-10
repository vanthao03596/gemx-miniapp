import { CustomHeader } from '@/components/CustomHeader';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import usePageSize from '@/hooks/usePageSize';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Badge, Cell, Section, Text } from '@telegram-apps/telegram-ui';
import dayjs from 'dayjs';
import styles from './QuestPage.module.scss';
import { MaterialSymbolsVisibilityOutlineRounded } from '@/icon/icon';

interface QuestsData {
    id: number;
    name: string;
    image: string;
    description: string;
    start_date: Date;
    end_date: Date;
    owner_id: number;
    category_id: number;
    rewards: {
        params: {
            token_type: string;
            number_of_rewards: number;
            total_token_amount: number;
        };
        template_id: string;
    }[];
    status: string;
    views: number;
    slug: string;
}

interface QuestsResponse {
    current_page: number;
    data: QuestsData[];
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

const QuestPagePage = () => {
    const { page, handleChangePageSize } = usePageSize();
    const axiosAuth = useAxiosAuth();

    const getQuests = async () => {
        const url = `/latest-campaign?page=${page}`;
        const res = await axiosAuth.get<QuestsResponse>(url);
        return res.data;
    };

    const { data: dataQuests } = useQuery({
        queryKey: ['get-quests', page],
        queryFn: getQuests,
    });

    return (
        <div className={styles.container}>
            {/* Title */}
            <CustomHeader title={'Quests'} hasBack />

            {/* Quests */}
            <Section className={styles.section}>
                {dataQuests?.data.map((item, index) => (
                    <Cell
                        after={
                            <Badge type='number' mode='secondary' className={styles.status}>
                                {dayjs().utc().isBefore(dayjs(item.end_date).utc()) ? 'Ongoing' : 'Finished'}
                            </Badge>
                        }
                        before={<Avatar size={48} src={item.image} />}
                        description={
                            <div className={styles.description}>
                                <MaterialSymbolsVisibilityOutlineRounded />
                                <Text>{item.views}</Text>
                            </div>
                        }
                        key={index}
                    >
                        <Text caps>{item.name}</Text>
                    </Cell>
                ))}
            </Section>

            {/* Pagination */}
            {dataQuests && (
                <div className={styles.pagination}>
                    <CustomPagination
                        pageNumber={dataQuests.current_page}
                        totalPages={dataQuests.last_page}
                        handlePageChange={handleChangePageSize}
                    />
                </div>
            )}
        </div>
    );
};

export default QuestPagePage;
