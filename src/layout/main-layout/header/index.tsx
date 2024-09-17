import React, { FC } from 'react'

import { Button, Input, Layout, Switch } from 'antd';
import { MenuOutlined, SearchOutlined, BulbOutlined, MoonOutlined, } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import { useWindowSize } from '@uidotdev/usehooks';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/store';
import { THEME_MODES, updateTheme } from 'src/store/slices/theme';

import Profile from 'src/layout/main-layout/header/components/profile';
import LanguageDropdown from 'src/layout/main-layout/header/components/language-dropdown';

const { Header } = Layout;

const LayoutHeader: FC<any> = ({ borderWithBg, collapsed, setCollapsed }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const themeState = useSelector((state: RootState) => state.theme);

    const toggleTheme = () => dispatch(updateTheme(themeState.mode === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT));

    return (
        <Header className="px-4 py-2 flex gap-3 justify-between items-center shadow-sm border-b" style={borderWithBg}>
            <div className="flex gap-3 items-center">
                {(width || 0) > 768 &&
                    <>
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="w-8 h-8 shrink-0"
                        />
                        <Input addonBefore={<SearchOutlined />} placeholder={t('SEARCH')} className='max-w-[300px]' />
                    </>
                }
            </div>
            <div className="flex gap-3 items-center">
                <LanguageDropdown />
                <Profile />
                <Switch
                    checked={themeState.mode === THEME_MODES.DARK}
                    onChange={toggleTheme}
                    checkedChildren={<MoonOutlined />}
                    unCheckedChildren={<BulbOutlined />}
                />
            </div>
        </Header>
    )
}

export default LayoutHeader
