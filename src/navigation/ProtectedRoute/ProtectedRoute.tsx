import { BottomNavigation } from '@/components/BottomNavigation';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { useQuery } from '@tanstack/react-query';
import { useLaunchParams } from '@tma.js/sdk-react';
import { Navigate, Outlet } from 'react-router-dom';

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

const ProtectedRoute = () => {
    const axiosAuth = useAxiosAuth();
    const lp = useLaunchParams();
    console.log(lp.initDataRaw);

    const getUser = async () => {
        const res = await axiosAuth.get<GetUserInfoResponse>('/user/info');
        return res.data;
    };

    const { data } = useQuery({
        queryKey: ['get-user'],
        queryFn: getUser,
        // enabled: !!lp.initDataRaw,
    });

    console.log(data);

    if (!data) return null;

    return data.user ? (
        <>
            <Outlet />
            <BottomNavigation />
        </>
    ) : (
        <Navigate to={'/register'} replace />
    );
};

export default ProtectedRoute;
