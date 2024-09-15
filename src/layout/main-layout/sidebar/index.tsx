import React, { FC } from 'react'

import { useNavigate } from 'react-router-dom';

import { Layout, Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

import DashboardIcon from 'src/assets/icons/dashboard-icon';
import ProjectsIcon from 'src/assets/icons/projects-icon';
import EstimatesIcon from 'src/assets/icons/estimates-icon';

const { Sider } = Layout;

const SideBar: FC<any> = ({ collapsed, borderWithBg }) => {

    const navigate = useNavigate();

    const items: ItemType<MenuItemType>[] = [
        {
            key: 'dashboard',
            className: '!px-3',
            icon: <DashboardIcon />,
            label: 'Dashboard',
            onClick: () => navigate('/')
        },
        {
            key: 'project',
            className: '!px-3',
            icon: <ProjectsIcon />,
            label: 'Projects',
            onClick: () => navigate('/project')
        },
        {
            key: 'estimate',
            className: '!px-3',
            icon: <EstimatesIcon />,
            label: 'Estimates',
            onClick: () => navigate('/estimate')
        },
    ]

    return (
        <Sider trigger={null} className="p-1.5 border-r shadow-md" style={borderWithBg} collapsible collapsed={collapsed} width={240} collapsedWidth={65}>
            <Menu
                style={{ borderRight: 0 }}
                mode="inline"
                selectedKeys={['1']}
                items={items}
            />
        </Sider>
    )
}

export default SideBar
