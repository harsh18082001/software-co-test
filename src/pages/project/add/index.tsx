import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Button, Col, DatePicker, Form, Input, Row, Select, theme, Typography } from 'antd';

import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs'

import useGet from 'src/hooks';
import { axiosInstance, genrateId, postData } from 'src/utils';
import { useAppSelector } from 'src/store';
import { FC, useEffect } from 'react';

interface IFormConfig {
    label: string;
    name: string;
    rules: Rule[] | undefined;
    placeholder: string;
    type: 'input' | 'select' | 'date';
    mode?: 'multiple',
    size?: SizeType;
    options?: DefaultOptionType[] | undefined,
    selectLoading?: boolean;
}

const ProjectAdd: FC<any> = ({ edit }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAppSelector((state) => state.auth);
    const users = auth.all_users.map(({ id, user_name }) => ({ value: id, label: user_name }));

    const [form] = Form.useForm();

    const [statusList, loading] = useGet<{ status: string[] }>('/master');

    const { token: { colorBorderBg } } = theme.useToken();

    const formConfig: IFormConfig[] = [
        {
            label: 'Customer',
            name: 'customer',
            rules: [{ required: true }],
            placeholder: 'Select customer',
            type: 'select',
            options: [
                { label: 'customer 1', value: 'customer_1' },
                { label: 'customer 2', value: 'customer_2' },
                { label: 'customer 3', value: 'customer_3' },
                { label: 'customer 4', value: 'customer_4' },
            ]
        },
        {
            label: 'Reference Number',
            name: 'ref_number',
            rules: [{ required: true }],
            placeholder: 'Enter your reference number',
            type: 'input',
        },
        {
            label: 'Project Name',
            name: 'project_name',
            rules: [{ required: true }],
            placeholder: 'Enter your project name',
            type: 'input',
        },
        {
            label: 'Project Number',
            name: 'project_number',
            rules: [{ required: true }],
            placeholder: 'Enter your project number',
            type: 'input',
        },
        {
            label: 'Area Location',
            name: 'area_location',
            rules: [{ required: true }],
            placeholder: 'Enter your project area location',
            type: 'input',
        },
        {
            label: 'Address',
            name: 'address',
            rules: [{ required: true }],
            placeholder: 'Enter your project address',
            type: 'input',
        },
        {
            label: 'Due Date',
            name: 'due_date',
            rules: [{ required: true }],
            placeholder: 'Select Due Date',
            type: 'date',
        },
        {
            label: 'Contact',
            name: 'contact',
            rules: [{ required: true }],
            placeholder: 'Enter your contact',
            type: 'input',
        },
        {
            label: 'Manager',
            name: 'manager',
            rules: [{ required: true }],
            placeholder: 'Select project manager',
            type: 'select',
            options: users
        },
        {
            label: 'Staff',
            name: 'staff',
            rules: [{ required: true }],
            placeholder: 'Select project staff',
            type: 'select',
            mode: 'multiple',
            options: users
        },
        {
            label: 'Status',
            name: 'status',
            rules: [{ required: true }],
            placeholder: 'Select project status',
            type: 'select',
            selectLoading: loading,
            options: statusList?.status?.map(value => ({ value }))
        },
        {
            label: 'Email',
            name: 'email',
            rules: [{ required: true }, { type: 'email' }],
            placeholder: 'Enter your email',
            type: 'input',
        },
    ]

    const onFinish = async (values: any) => {
        const nowDate = dayjs(new Date());
        if (!edit) {
            values.id = genrateId();
            values.created_at = nowDate;
        } else {
            values.id = id;
            delete values.created_at;
        }
        values.updated_at = nowDate;
        await postData({ url: edit ? `/project/${id}` : '/project', method: edit ? 'put' : 'post', data: values });
        toast.success('Project added successfully :)');
        navigate('/project');
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const getDataById = async () => {
        if (edit) {
            try {
                const res = await axiosInstance({ method: 'get', url: '/project', params: { id } })
                form.setFieldsValue({
                    ...res.data[0],
                    due_date: dayjs(res.data[0]?.due_date),
                });
            } catch (error) {
                toast.error('Something went wrong :(')
            }
        }
    }

    useEffect(() => {
        getDataById();
    }, []);

    return (
        <>
            <Typography.Title level={3}>Add New Project</Typography.Title>
            <div className="p-4 rounded-md" style={{ backgroundColor: colorBorderBg }}>
                <Form
                    form={form}
                    name="addproject"
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-4"
                    onFinishFailed={onFinishFailed}
                    initialValues={{ remember: true }}
                >
                    <Row gutter={15} className="w-full">
                        {formConfig?.map(({ label, name, rules, placeholder, type, size, options, selectLoading, mode }, key) =>
                            <Col key={key} span={24} md={12} lg={8}>
                                <Form.Item label={label} name={name} rules={rules}>
                                    {type === 'input' && <Input size={size} placeholder={placeholder} />}
                                    {type === 'select' && <Select mode={mode} size={size} placeholder={placeholder} options={options} loading={selectLoading} />}
                                    {type === 'date' && <DatePicker className="w-full" size={size} placeholder={placeholder} />}
                                </Form.Item>
                            </Col>
                        )}
                    </Row>

                    <Row gutter={15} className="w-full">
                        <Col span={24} md={12} lg={8}>
                            <Button type="primary" htmlType="submit" size="large" className="w-full max-w-[418px]">Add Now</Button>
                        </Col>
                        <Col span={24} md={12} lg={8}>
                            <Button type="primary" onClick={() => navigate('/project')} size="large" className="w-full max-w-[418px]">Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default ProjectAdd;
