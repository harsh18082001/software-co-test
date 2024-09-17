import React, { FC } from 'react';

import { theme } from 'antd';

import LoaderIcon from 'src/assets/icons/loader-icon';

const Loader: FC<any> = ({ loading }) => {

    const { token: { colorBgContainer } } = theme.useToken();

    if (loading) {
        return (
            <div className="fixed inset-0 flex justify-center items-center" style={{ backgroundColor: colorBgContainer }}>
                <LoaderIcon />
            </div>
        )
    }
}

export default Loader
