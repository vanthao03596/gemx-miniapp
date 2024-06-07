import React from 'react';
import styles from './RegisterPage.module.scss';
import { useLaunchParams } from '@tma.js/sdk-react';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useQuery } from '@tanstack/react-query';

interface GetUserInfoResponse {
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string;
        created_at: Date;
        updated_at: Date;
        type: string;
        address: string;
        ref_address: string;
        image_path: string;
        is_vip: number;
        follower: number;
        following: number;
        can_create_report: number;
        invite_earned: number;
        telegram_id: number;
        telegram_username: string;
        nonce: string;
        gas_power: number;
        gas_rate_lvl: number;
        last_claim_gxp: Date;
        gas_price: number;
    };
}

const RegisterPage = () => {
    const axiosAuth = useAxiosAuth();
    const initDataRaw = useLaunchParams().initDataRaw;

    const getInfo = async () => {
        const res = await axiosAuth.post<GetUserInfoResponse>('/user/info');
        return res.data;
    };

    const { data: userInfo } = useQuery({
        queryKey: ['get-info'],
        queryFn: getInfo,
    });

    return (
        <div>
            {/* Init data */}
            <div className={styles.initDataRaw}>{initDataRaw}</div>
            <div>Info</div>
            <div>{userInfo?.user.follower}</div>
        </div>
    );
};

export default RegisterPage;
