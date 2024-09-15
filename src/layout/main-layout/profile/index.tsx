import React from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { RootState } from 'src/store';
import { logout } from 'src/store/slices/auth';
import { ItemType } from 'antd/es/menu/interface';

const Profile = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const menuItems: ItemType[] = [
        {
            key: '1',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: () => { dispatch(logout()) },
        },
    ];

    return (
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight" arrow>
            <div className="flex items-center space-x-2 cursor-pointer p-1.5 rounded transition-colors">
                <Avatar size="default" icon={<UserOutlined />} />
                <div className="hidden md:flex flex-col gap-1">
                    <div className="font-medium leading-none">{auth?.current_user?.user_name}</div>
                    <div className="block text-xs leading-none">{auth?.current_user?.email}</div>
                </div>
            </div>
        </Dropdown>
    )
}

export default Profile;
