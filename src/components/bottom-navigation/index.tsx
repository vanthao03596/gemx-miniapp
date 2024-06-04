import styles from "./bottom-navigation.module.scss";
import { routes } from "@/navigation/routes";
import { BottomNavigationItem } from "./bottom-navigation-item";
import { useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.bottomNavigation}>
      {routes.map((route) => (
        <BottomNavigationItem
          key={route.title}
          title={route.title as string}
          href={route.path}
          isActive={pathname === route.path}
        />
      ))}
    </div>
  );
};
