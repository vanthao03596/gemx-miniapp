import { Link } from "react-router-dom";
import styles from "./bottom-navigation-item.module.scss";

type BottomNavigationItemProps = {
  title: string;
  icon?: React.ReactNode;
  href: string;
  isActive?: boolean;
};

export const BottomNavigationItem = ({
  title,
  href,
  isActive = false,
}: BottomNavigationItemProps) => {
  const status = isActive ? "active" : "";
  return (
    <Link
      to={href}
      className={[styles.bottomNavigationItem, styles[status]].join(" ")}
    >
      <p>{title}</p>
    </Link>
  );
};
