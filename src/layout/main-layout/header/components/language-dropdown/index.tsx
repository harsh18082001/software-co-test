import React, { useState } from 'react'

import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import USFlagIcon from 'src/assets/icons/us-flag-icon';
import INFlagIcon from 'src/assets/icons/in-flag-icon';

const LanguageDropdown = () => {

    const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        setSelectedLanguage(language);
    };

    const languageOptions = [
        {
            key: 'EN',
            label: t('EN'),
            icon: <USFlagIcon width={14} />,
            onClick: () => handleLanguageChange('EN'),
        },
        {
            key: 'HN',
            label: t('HN'),
            icon: <INFlagIcon width={14} />,
            onClick: () => handleLanguageChange('HN'),
        },
    ];

    const currentLanguage = languageOptions.find((item) => item?.key === selectedLanguage);

    return (
        <Dropdown menu={{ items: languageOptions }} trigger={['click']} placement="bottomLeft">
            <button>
                <div className="flex gap-1.5 items-center">
                    {currentLanguage?.icon}
                    {t(selectedLanguage)} <DownOutlined />
                </div>
            </button>
        </Dropdown>
    )
}

export default LanguageDropdown;