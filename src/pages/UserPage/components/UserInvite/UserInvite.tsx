import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { TablerCopy, TablerShare3 } from '@/icon/icon';
import { useInitData, useUtils } from '@tma.js/sdk-react';
import styles from './UserInvite.module.scss';
import toast from 'react-hot-toast';

const MY_REFERRALS = 0;

const UserInvite = () => {
    const utils = useUtils();
    const userId = useInitData()?.user?.id;
    const shareText = 'Join with us to get rewards together';
    const inviteLink = `https://t.me/GemxMiniappBot?start=${userId}`;
    const shareLink = `https://t.me/share/url?url=${inviteLink}&text=${shareText}`;
    const [, copy] = useCopyToClipboard();

    const handleCopy = () => {
        copy(inviteLink);
        toast.success('Copy to clipboard successful');
    };

    const handleShare = () => {
        utils.openTelegramLink(shareLink);
    };

    return (
        <div className={styles.container}>
            {/* Referrals */}
            <div className={styles.referral}>
                {/* Title */}
                <div className={styles.title}>
                    <div className={styles.text}>My referrals</div>
                    <div className={styles.number}>{MY_REFERRALS}</div>
                </div>

                {/* Description */}
                <div className={styles.description}>Invite friends and earn together</div>

                {/* Input with copy */}
                <div className={styles.inputContainer}>
                    <input type='text' readOnly defaultValue={inviteLink} className={styles.input} />
                    <div className={styles.icon}>
                        <TablerCopy className={styles.copy} onClick={handleCopy} />
                    </div>
                </div>

                {/* Button share */}
                <div className={styles.btnShare} onClick={handleShare}>
                    <TablerShare3 fontSize={16} />
                    <div>Send link</div>
                </div>
            </div>
        </div>
    );
};

export default UserInvite;
