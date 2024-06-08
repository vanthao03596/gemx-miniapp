import { Avatar, Cell } from "@telegram-apps/telegram-ui";

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
      subtitle={`Cấp độ ${level}`}
      style={{ padding: 0 }}
    >
      {username}
    </Cell>
  </>
);
