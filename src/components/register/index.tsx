import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button, Checkbox, Typography, theme } from 'antd';

import { useAppDispatch } from 'src/store';
import { register } from 'src/store/slices/auth';

const { Title, Text } = Typography;

// Define the type for the form values
interface FormValues {
  email: string;
  user_name: string;
  password: string;
  termsAccepted?: boolean;
}

const Register: FC<any> = ({ formRef, onFinishFailed }) => {

  const dispatch = useAppDispatch();

  const onFinish = (values: FormValues) => {
    delete values.termsAccepted;
    dispatch(register(values));
  };

  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <div className="p-8 rounded-2xl shadow-lg w-full max-w-[500px]" style={{ backgroundColor: colorBgContainer }}>
      <Title level={3} className="text-center mb-2">Create an Account</Title>
      <Text className="block text-center mb-5">Create an account to continue</Text>

      <Form
        ref={formRef}
        name="signup"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item label="Email address" name="email" rules={[{ required: true }, { type: 'email' }]}>
          <Input size="large" placeholder="esteban_schiller@gmail.com" />
        </Form.Item>

        <Form.Item label="Username" name="user_name" rules={[{ required: true }, { max: 60 }]}>
          <Input size="large" placeholder="Username" />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password size="large" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" />
        </Form.Item>

        <Form.Item
          name="termsAccepted"
          valuePropName="checked"
          rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept terms and conditions') }]}
        >
          <Checkbox>I accept terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item className="text-center">
          <Button type="primary" htmlType="submit" size="large" className="w-full max-w-[418px]">
            Sign Up
          </Button>
        </Form.Item>

        <Text className="text-center block">
          Already have an account? <Link to="/auth/login" className="text-blue-500">Login</Link>
        </Text>
      </Form>
    </div>
  )
}

export default Register;