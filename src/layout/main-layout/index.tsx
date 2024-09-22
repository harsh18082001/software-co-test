import { FC, useEffect, useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { Layout, theme } from 'antd';
import { useWindowSize } from '@uidotdev/usehooks';

import { useAppSelector } from 'src/store';

import SideBar from 'src/layout/main-layout/sidebar';
import LayoutHeader from 'src/layout/main-layout/header';

const { Content } = Layout;

const MainLayout: FC = () => {

    const { token: { colorBgContainer, colorBorder } } = theme.useToken();
    const borderWithBg = { backgroundColor: colorBgContainer, borderColor: colorBorder };

    const navigate = useNavigate();
    const { width } = useWindowSize();
    const auth = useAppSelector((state) => state.auth);

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (!auth?.current_user) navigate('/auth/login');
    }, [auth]);

    useEffect(() => {
        setCollapsed((width || 0) <= 768)
    }, [width]);

    return (
        <Layout className='h-full'>
            <SideBar collapsed={collapsed} borderWithBg={borderWithBg} />
            <Layout>
                <LayoutHeader borderWithBg={borderWithBg} collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content className="p-4 overflow-x-hidden overflow-y-auto">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default MainLayout;