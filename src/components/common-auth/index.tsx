import React, { FC, MutableRefObject, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from 'src/components/login';
import Register from 'src/components/register';

import { RootState } from 'src/store';

const CommonAuth: FC<{ type: 'login' | 'register' }> = ({ type }) => {
    const navigate = useNavigate();

    const formRef: MutableRefObject<any> = useRef();

    const auth = useSelector((state: RootState) => state.auth);

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