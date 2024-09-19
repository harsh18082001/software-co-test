import { Button, Col, DatePicker, Form, Input, Row, Select, theme, Typography } from 'antd';
import { Rule } from 'antd/es/form';
import { DefaultOptionType } from 'antd/es/select';
import { SizeType } from 'antd/es/config-provider/SizeContext';

import { useSelector } from 'react-redux';

import useFetch from 'src/hooks';
import { RootState } from 'src/store';
import { DataType } from 'src/pages/project';
import { updateData } from 'src/store/slices/project';

interface IFormConfig {
    label: string;
    name: string;
    rules: Rule[] | undefined;
    placeholder: string;
    type: 'input' | 'select' | 'date';
    size: SizeType;
    options?: DefaultOptionType[] | undefined,
    selectLoading?: boolean;
}

const ProjectAdd = () => {

    const auth = useSelector((state: RootState) => state.auth);
    const projects = useSelector((state: RootState) => state.project);
    const users = auth.all_users.map(({ id, user_name }) => ({ value: id, label: user_name }));

    useFetch<DataType[]>('/project', null, updateData);

    const { token: { colorBorderBg } } = theme.useToken();

    const statusList = () => {
        if (projects?.data?.length) {
            const uniqueClone = [...new Set(projects?.data?.map(({ status }: any) => status))];
            const selectMap = uniqueClone.map((status: any) => ({ label: status, value: status?.toLowerCase().replaceAll(' ', '_') }))
            return selectMap
        }
        return [];
    }

    const formConfig: IFormConfig[] = [
        {
            label: 'Customer',
            name: 'customer',
            rules: [{ required: true }],
            placeholder: 'Select customer',
            type: 'select',
            size: 'large',
            options: [
                { label: 'customer 1', value: 'customer_1' },
                { label: 'customer 2', value: 'customer_2' },
                { label: 'customer 3', value: 'customer_3' },
                { label: 'customer 4', value: 'customer_4' },
            ]
        },
        {
            label: 'Reference Number',
            name: 'reference_number',
            rules: [{ required: true }],
            placeholder: 'Enter your reference number',
            type: 'input',
            size: 'large',
        },
        {
            label: 'Project Name',
            name: 'project_name',
            rules: [{ required: true }],
            placeholder: 'Enter your project name',
            type: 'input',
            size: 'large',
        },
        {
            label: 'Project Number',
            name: 'project_number',
            rules: [{ required: true }],
            placeholder: 'Enter your project number',
            type: 'input',
            size: 'large',
        },
        {
            label: 'Area Location',
            name: 'area_location',
            rules: [{ required: true }],
            placeholder: 'Enter your project area location',
            type: 'input',
            size: 'large',
        },
        {
            label: 'Address',
            name: 'address',
            rules: [{ required: true }],
            placeholder: 'Enter your project address',
            type: 'input',
            size: 'large',
        },
        {
            label: 'Due Date',
            name: 'due_date',
            rules: [{ required: true }],
            placeholder: 'Select Due Date',
            type: 'date',
            size: 'large',
        },
        {
            label: 'Contact',
            name: 'contact',
            rules: [{ required: true }],
            placeholder: 'Enter your contact',
            type: 'input',
            size: 'large',
        },
        {
            label: 'Manager',
            name: 'manager',
            rules: [{ required: true }],
            placeholder: 'Select project manager',
            type: 'select',
            size: 'large',
            options: users
        },
        {
            label: 'Contact',
            name: 'contact',
            rules: [{ required: true }],
            placeholder: 'Enter your contact',
            type: 'input',
            size: 'large',
            options: users
        },
        {
            label: 'Status',
            name: 'status',
            rules: [{ required: true }, { type: 'email' }],
            placeholder: 'Select project status',
            type: 'select',
            size: 'large',
            selectLoading: projects.loading,
            options: statusList()
        },
        {
            label: 'Email',
            name: 'email',
            rules: [{ required: true }, { type: 'email' }],
            placeholder: 'Enter your email',
            type: 'input',
            size: 'large',
        },
    ]

    const onFinish = () => {

    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Typography.Title level={3}>Add New Project</Typography.Title>
            <div className="p-4 rounded-md" style={{ backgroundColor: colorBorderBg }}>
                <Form
                    name="signin"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="space-y-4"
                >
                    <Row gutter={20} className="w-full">
                        {formConfig?.map(({ label, name, rules, placeholder, type, size, options, selectLoading }) =>
                            <Col lg={8}>
                                <Form.Item label={label} name={name} rules={rules}>
                                    {type === 'input' && <Input size={size} placeholder={placeholder} />}
                                    {type === 'select' && <Select size={size} placeholder={placeholder} options={options} loading={selectLoading} />}
                                    {type === 'date' && <DatePicker className="w-full" size={size} placeholder={placeholder} />}
                                </Form.Item>
                            </Col>
                        )}
                    </Row>

                    <Row gutter={20} className="w-full">
                        <Col lg={8}>
                            <Button type="primary" htmlType="submit" size="large" className="w-full max-w-[418px]">Add Now</Button>
                        </Col>
                        <Col lg={8}>
                            <Button type="primary" htmlType="submit" size="large" className="w-full max-w-[418px]">Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}

export default ProjectAdd;
