import React, { FC } from 'react'

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { Layout, Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

import DashboardIcon from 'src/assets/icons/dashboard-icon';
import ProjectsIcon from 'src/assets/icons/projects-icon';
import EstimatesIcon from 'src/assets/icons/estimates-icon';
import LogoIcon from 'src/assets/icons/logo-icon';
import LogoCollapse from 'src/assets/icons/logo-collapse';

const { Sider } = Layout;

const SideBar: FC<any> = ({ collapsed, borderWithBg }) => {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const items: ItemType<MenuItemType>[] = [
        {
            key: 'dashboard',
            className: '!px-2.5',
            icon: <DashboardIcon />,
            label: t('DASHBOARD'),
            onClick: () => navigate('/')
        },
        {
            key: 'project',
            className: '!px-2.5',
            icon: <ProjectsIcon />,
            label: t('PROJECTS'),
            onClick: () => navigate('/project')
        },
        {
            key: 'estimate',
            className: '!px-2.5',
            icon: <EstimatesIcon />,
            label: t('ESTIMATES'),
            onClick: () => navigate('/estimate')
        },
    ]

    return (
        <Sider trigger={null} className="p-1.5 border-r shadow-md" style={borderWithBg} collapsible collapsed={collapsed} width={220} collapsedWidth={60}>
            <Link to="/" className="inline-flex items-center h-12 mb-1">
                {collapsed ?
                    <LogoCollapse className="w-full" />
                    : <LogoIcon className="w-full" />
                }
            </Link>
            <Menu
                style={{ borderRight: 0 }}
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                items={items}
            />
        </Sider>
    )
}

export default SideBar
