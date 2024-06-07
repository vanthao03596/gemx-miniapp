import { CustomHeader } from '@/components/CustomHeader';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { Icon24Close } from '@/icon/icon';
import { useMutation } from '@tanstack/react-query';
import { Button, Input, List, Tappable, Text } from '@telegram-apps/telegram-ui';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
    const navigate = useNavigate();
    const axiosAuth = useAxiosAuth();

    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string>('');

    const updateUser = async (address: string) => {
        const res = await axiosAuth.post('/user/info', { address });
        return res.data;
    };

    const mutation = useMutation({
        mutationKey: ['update-user'],
        mutationFn: updateUser,
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
            }
        },
    });

    const handleUpdateUser = () => {
        mutation.mutate(address);
    };

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setError('');
    };

    const handleClearAddress = () => {
        setAddress('');
        setError('');
    };

    return (
        <div className={styles.container}>
            <CustomHeader title="Let's start" />
            <List>
                <Input
                    status={error ? 'error' : 'focused'}
                    header='Wallet Address'
                    placeholder={error ? error : '0x . . .'}
                    value={address}
                    onChange={handleChangeAddress}
                    after={
                        <Tappable
                            Component='div'
                            style={{
                                display: 'flex',
                            }}
                            onClick={handleClearAddress}
                        >
                            <Icon24Close />
                        </Tappable>
                    }
                />
                {error && <Text className={styles.error}>{error}</Text>}
            </List>

            <div className={`${styles.submit} ${styles.center}`}>
                <Button loading={mutation.isPending} disabled={!address} onClick={handleUpdateUser}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default RegisterPage;
