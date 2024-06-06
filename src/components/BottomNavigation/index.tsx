import { routes } from "@/navigation/routes";
import { Tabbar } from "@telegram-apps/telegram-ui";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(`${path}`);
  };

  return (
    <Tabbar>
      {routes.map(({ title, path, icon }) => (
        <Tabbar.Item
          key={title}
          text={title}
          selected={pathname === path}
          onClick={() => handleClick(path)}
        >
          {icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
};
