import { FC, useEffect, useState } from 'react';

import { Button, Col, Form, Row, theme, Typography } from 'antd';
import { PlusCircleFilled, MinusCircleFilled } from '@ant-design/icons';

import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import dayjs from 'dayjs'

import useGet from 'src/hooks';
import { axiosInstance, genrateId, postData } from 'src/utils';
import FormItemCol from 'src/components/form-item-col';
import { configureFormFeilds, IFormConfig } from 'src/pages/estimate/add/constant';

const EstimateAdd: FC<any> = ({ edit }) => {

    const validateMessages = {
        required: "This feild is required!",
        types: {
            email: "Input is not valid!",
            number: "Input is not valid!",
        },
    };

    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const [statusList, loading] = useGet<{ estimate_status: string[] }>('/master');

    const { token: { colorBorder, colorBorderBg } } = theme.useToken();

    const [formConfig, setFormConfig] = useState<IFormConfig[][]>([]);

    const groupAddClick = () => {
        setFormConfig([...formConfig, ...configureFormFeilds(statusList || { estimate_status: [] }, loading, formConfig.length)])
    }

    const configureInitialForemFeild = () => {
        setFormConfig([...configureFormFeilds(statusList, loading, 0)]);
    }

    const onValuesChange = (changedValues: any, allValues: any) => {
        const changedFieldName = Object.keys(changedValues)[0];
        const splitString = changedFieldName.split('_');
        const combinedIndex = splitString[splitString?.length - 1];
        const [outerIndex, innerIndex] = combinedIndex.split('#');
        const price = parseFloat(allValues[`price_${combinedIndex}`]) || 0;
        const quantity = parseFloat(allValues[`quantity_${combinedIndex}`]) || 0;
        const margin_pr = parseFloat(allValues[`margin_pr_${combinedIndex}`]) || 0;
        if (price || quantity || margin_pr) {
            form.setFieldValue(`total_${combinedIndex}`, (quantity * price + (((quantity * price) * (margin_pr)) / 100) || 0).toFixed(2));
        } else {
            form.setFieldValue(`total_${combinedIndex}`, 0)
        }
    }

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
        await postData({ url: edit ? `/estimate/${id}` : '/estimate', method: edit ? 'put' : 'post', data: values });
        toast.success('Estimate added successfully :)');
        navigate('/estimate');
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const getDataById = async () => {
        if (edit) {
            try {
                const res = await axiosInstance({ method: 'get', url: '/estimate', params: { id } })
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

    useEffect(() => {
        configureInitialForemFeild();
    }, [loading]);


return (
    <>
        <Typography.Title level={3}>Add New Estimate</Typography.Title>
        <div className="p-4 rounded-md" style={{ backgroundColor: colorBorderBg }}>
            <Form
                form={form}
                name="addestimate"
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
                initialValues={{ remember: true }}
                validateMessages={validateMessages}
            >
                {formConfig?.map((group, key) =>
                    <div className="" key={`group_${key}`}>
                        <div className="flex gap-3 relative">
                            <div className="h-0.5 w-full absolute top-4" style={{ backgroundColor: colorBorder }} />
                            <Button className="mb-6 relative z-[1]" onClick={groupAddClick} icon={<PlusCircleFilled />} />
                            <Row gutter={15} className="w-full relative z-[1]">
                                {group.map(({ name, rules, placeholder, type, size, options, selectLoading, mode, suffix, data, readOnly }, key) =>
                                    <>
                                        {
                                            data ?
                                                !!data?.length &&
                                                <>
                                                    {data?.map(({ name, rules, placeholder, type, size, options, selectLoading, mode, suffix, readOnly }: any, key: number) =>
                                                        <FormItemCol
                                                            span={12}
                                                            md={9}
                                                            lg={3}
                                                            key={key}
                                                            name={name}
                                                            rules={rules}
                                                            type={type}
                                                            size={size}
                                                            placeholder={placeholder}
                                                            suffix={suffix}
                                                            readOnly={readOnly}
                                                            mode={mode}
                                                            options={options}
                                                            selectLoading={selectLoading}
                                                        />
                                                    )}
                                                    <Col key={key} span={12} md={9} lg={3}>
                                                        <div className="flex justify-center gap-2">
                                                            <Button type='text' icon={<PlusCircleFilled />} />
                                                            <Button type='text' icon={<MinusCircleFilled />} />
                                                        </div>
                                                    </Col>
                                                </>
                                                :
                                                <FormItemCol
                                                    span={24}
                                                    md={12}
                                                    lg={6}
                                                    key={key}
                                                    name={name}
                                                    rules={rules}
                                                    type={type}
                                                    size={size}
                                                    placeholder={placeholder}
                                                    suffix={suffix}
                                                    readOnly={readOnly}
                                                    mode={mode}
                                                    options={options}
                                                    selectLoading={selectLoading}
                                                />

                                        }
                                    </>
                                )}
                            </Row>
                        </div>
                    </div>
                )}

                <Row gutter={15} className="w-full">
                    <Col span={24} md={12} lg={8}>
                        <Button type="primary" htmlType="submit" size="large" className="w-full max-w-[418px]">Submit</Button>
                    </Col>
                    <Col span={24} md={12} lg={8}>
                        <Button type="primary" onClick={() => navigate('/estimate')} size="large" className="w-full max-w-[418px]">Cancel</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    </>
)
}

export default EstimateAdd;
