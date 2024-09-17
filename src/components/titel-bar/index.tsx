import React, { FC } from 'react'

import { Button, Typography } from 'antd';

import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const TitleBar: FC<any> = ({ title, addText, filters }) => {

    const { t } = useTranslation();

    return (
        <div className="flex justify-between items-center mb-4">
            <Title level={3}>{t(title)}</Title>
            <div className="flex items-center gap-2">
                {filters}
                <Button type='primary'>{t(addText)}</Button>
            </div>
        </div>
    )
}

export default TitleBar;
