import { routes } from '@/navigation/routes';
// import { Tabbar } from '@telegram-apps/telegram-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabBar as AntTabBar } from 'antd-mobile'

const navItems = ['/', '/wallet', '/research', '/quest', '/user'];

export const BottomNavigation = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleClick = (path: string) => {
        navigate(`${path}`);
    };

    return (
        <AntTabBar safeArea activeKey={pathname} onChange={value => handleClick(value)} style={{backgroundColor: 'var(--tg-bg-color)'}}>
            {routes
                .filter((item) => navItems.includes(item.path))
                .map(({ title, path, icon }) => (
                    <AntTabBar.Item key={path} icon={icon} title={title}/>
                    // <Tabbar.Item
                    //     key={title}
                    //     text={title}
                    //     selected={pathname === path}
                    //     onClick={() => handleClick(path)}
                    // >
                    //     {icon}
                    // </Tabbar.Item>
                ))}
        </AntTabBar>
    );
};
