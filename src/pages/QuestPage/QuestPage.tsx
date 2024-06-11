import { CustomHeader } from '@/components/CustomHeader';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import usePageSize from '@/hooks/usePageSize';
import { TablerCalendarPause, TablerEyeCheck, TablerGift } from '@/icon/icon';
import { useQuery } from '@tanstack/react-query';
import { List } from '@telegram-apps/telegram-ui';
import dayjs from 'dayjs';
import styles from './QuestPage.module.scss';

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

interface QuestCardProps {
    image: string;
    views: number;
    title: string;
    endDate: Date;
    rewards: QuestsData['rewards'];
    slug: string;
}

const QuestCard = (props: QuestCardProps) => {
    const { image, views, title, endDate, rewards, slug } = props;
    const isOngoing = dayjs().utc().isBefore(dayjs(endDate).utc());
    const listRewards = rewards.map((item) => ({
        amount: item.params.total_token_amount / item.params.number_of_rewards,
        unit: item.params.token_type,
    }));

    const handleClickCard = () => {
        window.open(`https://gemx.io/campaign/${slug}`, 'blank');
    };

    return (
        <div className={styles.questCard} onClick={handleClickCard}>
            {/* Image */}
            <img src={image} alt='Banner' className={styles.image} />

            {/* Body */}
            <div className={styles.body}>
                {/* Title */}
                <div className={styles.title}>
                    <div className={styles.name}>{title}</div>
                    <div className={`${styles.status} ${isOngoing ? styles.ongoing : styles.finished}`}>
                        {isOngoing ? 'Ongoing' : 'Finished'}
                    </div>
                </div>

                {/* Views */}
                <div className={`${styles.center} ${styles.views}`}>
                    <TablerEyeCheck />
                    <div>{views} views</div>
                </div>

                {/* Time */}
                <div className={`${styles.center} ${styles.time}`}>
                    <TablerCalendarPause />
                    {dayjs(endDate).utc().format('HH:mm DD/MM/YYYY')} (UTC)
                </div>

                {/* Rewards */}
                <div className={`${styles.center} ${styles.rewards}`}>
                    <TablerGift />
                    <div className={styles.list}>
                        {listRewards.map((item, index) => {
                            return (
                                <div key={index} className={styles.item}>
                                    <span>{item.amount} </span>
                                    <span>{item.unit}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuestPage = () => {
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
            <List className={styles.listContainer}>
                {dataQuests?.data.map((item, index) => (
                    <QuestCard
                        key={index}
                        image={item.image}
                        views={item.views}
                        title={item.name}
                        endDate={item.end_date}
                        rewards={item.rewards}
                        slug={item.slug}
                    />
                ))}
            </List>

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

export default QuestPage;
