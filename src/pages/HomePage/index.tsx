import { UserInfo } from "@/components/UserInfo";
import styles from "./homePage.module.scss";

export const HomePage = (): JSX.Element => {
  return (
    <div className={styles.homePage}>
      <UserInfo username="Hung nguyen" level={1} />
    </div>
  );
};
