import React, { FC, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Layout, Menu } from 'antd'

import DashboardIcon from 'src/assets/icons/dashboard-icon';
import ProjectsIcon from 'src/assets/icons/projects-icon';
import EstimatesIcon from 'src/assets/icons/estimates-icon';
import LogoIcon from 'src/assets/icons/logo-icon';
import LogoCollapse from 'src/assets/icons/logo-collapse';

const { Sider } = Layout;

const SideBar: FC<any> = ({ collapsed, borderWithBg }) => {

    const { t } = useTranslation();
    const { pathname } = useLocation();

    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);

    useEffect(() => {
        setDefaultSelectedKeys([items.map(({ key }) => key).find((key) => pathname.includes(key)) || 'dashboard'])
    }, []);

    const items = [
        {
            key: 'dashboard',
            className: '!px-2.5 flex',
            icon: <DashboardIcon />,
            label: t('DASHBOARD'),
            href: '/'
        },
        {
            key: 'project',
            className: '!px-2.5 flex',
            icon: <ProjectsIcon />,
            label: t('PROJECTS'),
            href: '/project'
        },
        {
            key: 'estimate',
            className: '!px-2.5 flex',
            icon: <EstimatesIcon />,
            label: t('ESTIMATES'),
            href: '/estimate'
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
            {!!defaultSelectedKeys.length && <Menu mode="inline" style={{ borderRight: 0 }} defaultSelectedKeys={defaultSelectedKeys} >
                {items.map(({ key, icon, label, href, className }) =>
                    <Menu.Item key={key} className={className} icon={icon}>
                        <Link to={href}>{label}</Link>
                    </Menu.Item>
                )}
            </Menu>}
        </Sider>
    )
}

export default SideBar
