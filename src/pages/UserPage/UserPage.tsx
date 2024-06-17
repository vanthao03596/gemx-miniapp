import { CustomHeader } from '@/components/CustomHeader';
import styles from './UserPage.module.scss';
import { UserInvite } from './components/UserInvite';

const UserPage = () => {
    return (
        <div className={styles.container}>
            {/* Header */}
            <CustomHeader title='User' />
            
            {/* Invite */}
            <UserInvite />
        </div>
    );
};

export default UserPage;
