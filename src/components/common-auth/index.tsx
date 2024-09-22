import React, { FC, MutableRefObject, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'src/store';

import Login from 'src/components/login';
import Register from 'src/components/register';

const CommonAuth: FC<{ type: 'login' | 'register' }> = ({ type }) => {
    const navigate = useNavigate();

    const formRef: MutableRefObject<any> = useRef();

    const auth = useAppSelector((state) => state.auth);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        formRef.current?.resetFields();
        if (auth?.current_user) navigate('/');
    }, [auth])

    if (!auth?.current_user) {
        if (type === 'login') {
            return <Login formRef={formRef} onFinishFailed={onFinishFailed} />
        }
        if (type === 'register') {
            return <Register formRef={formRef} onFinishFailed={onFinishFailed} />
        }
    }
}

export default CommonAuth;