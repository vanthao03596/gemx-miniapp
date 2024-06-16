import { Avatar, Cell } from "@telegram-apps/telegram-ui";
import styles from "./userInfo.module.scss";

export const UserInfo = ({
  src,
  username,
  level,
}: {
  src?: string;
  username?: string;
  level: number;
}) => (
  <>
    <Cell
      before={<Avatar size={48} src={src} />}
      subtitle={<span className={styles.level}>Level {level}</span>}
      style={{ padding: 0 }}
    >
      <span className={styles.username}>{username}</span>
    </Cell>
  </>
);
