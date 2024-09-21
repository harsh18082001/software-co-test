import React, { FC } from 'react'

import { Button, Typography } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const TitleBar: FC<any> = ({ title, addText, filters, addPath }) => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="flex flex-col justify-between mb-4">
            <Title level={3}>{t(title)}</Title>
            <div className="flex justify-between items-center gap-2">
                {filters}
                <Button type='primary' onClick={() => navigate(addPath)}>{t(addText)}</Button>
            </div>
        </div>
    )
}

export default TitleBar;
