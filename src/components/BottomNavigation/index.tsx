import { routes } from '@/navigation/routes';
import { Tabbar } from '@telegram-apps/telegram-ui';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = ['/', '/wallet', '/research', '/quest', '/user'];

export const BottomNavigation = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(`${path}`);
    };

    return (
        <Tabbar>
            {routes
                .filter((item) => navItems.includes(item.path))
                .map(({ title, path, icon }) => (
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
