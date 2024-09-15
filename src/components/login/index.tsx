import { FC } from 'react';
import { Form, Input, Button, Checkbox, Typography, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from 'src/store/slices/auth';

const { Title, Text } = Typography;

// Define the type for the form values
interface FormValues {
    email: string;
    password: string;
    remember?: boolean;
}

const Login: FC<any> = ({ formRef, onFinishFailed }) => {

    const dispatch = useDispatch();

    const { token: { colorBgContainer } } = theme.useToken();

    const onFinish = (values: FormValues) => {
        delete values.remember;
        dispatch(login(values));
    };

    return (
        <div className="p-8 rounded-2xl shadow-lg w-full max-w-[500px]" style={{ backgroundColor: colorBgContainer }}>
            <Title level={3} className="text-center mb-2">Login to Account</Title>
            <Text className="block text-center mb-5">Please enter your email and password to continue</Text>

            <Form
                ref={formRef}
                name="signin"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="space-y-4"
            >
                <Form.Item label="Email address" name="email" rules={[{ required: true }, { type: 'email' }]}>
                    <Input size="large" placeholder="esteban_schiller@gmail.com" />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password size="large" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember Password</Checkbox>
                </Form.Item>

                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit" size="large" className="w-full max-w-[418px]">
                        Sign In
                    </Button>
                </Form.Item>

                <Text className="text-center block">
                    Don’t have an account? <Link to="/auth/register" className="text-blue-500">Create Account</Link>
                </Text>
            </Form>
        </div>
    )
}

export default Login;