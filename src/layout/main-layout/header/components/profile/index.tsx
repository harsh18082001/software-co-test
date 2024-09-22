import { useTranslation } from 'react-i18next';

import { Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from 'src/store';
import { logout } from 'src/store/slices/auth';
import { ItemType } from 'antd/es/menu/interface';

const Profile = () => {

    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    const menuItems: ItemType[] = [
        {
            key: '1',
            label: t('LOGOUT'),
            icon: <LogoutOutlined />,
            onClick: () => { dispatch(logout()) },
        },
    ];

    return (
        <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight" arrow>
            <div className="flex items-center space-x-2 cursor-pointer p-1.5 rounded transition-colors">
                <Avatar size="default" icon={<UserOutlined />} />
                <div className="hidden md:flex flex-col gap-1">
                    <div className="font-medium leading-none max-w-[120px] lg:max-w-[150px] truncate" title={auth?.current_user?.user_name}>{auth?.current_user?.user_name}</div>
                    <div className="block text-xs leading-none max-w-[120px] lg:max-w-[150px] truncate" title={auth?.current_user?.email}>{auth?.current_user?.email}</div>
                </div>
            </div>
        </Dropdown>
    )
}

export default Profile;
