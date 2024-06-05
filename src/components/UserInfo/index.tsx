import { Avatar, Cell } from "@telegram-apps/telegram-ui";

export const UserInfo = ({
  src = "https://avatars.githubusercontent.com/u/84640980?v=4",
  username,
  level,
}: {
  src?: string;
  username: string;
  level: number;
}) => (
  <>
    <Cell before={<Avatar size={48} src={src} />} subtitle={`Cấp độ ${level}`}>
      {username}
    </Cell>
  </>
);
