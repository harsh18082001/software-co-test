import React, { FC } from 'react';

import { Outlet } from 'react-router-dom';

import authBg from '/assets/images/auth-bg.png';

const AuthLayout: FC = () => {
    return (
        <div style={{ backgroundImage: `url('${authBg}')` }} className='h-full bg-center bg-cover flex justify-center items-center p-4'>
            <Outlet />
        </div>
    )
}

export default AuthLayout;