import React, { FC } from 'react'

import { Col, DatePicker, Form, Input, Select } from 'antd'

const FormItemCol: FC<any> = ({
    span,
    md,
    lg,
    key,
    name,
    rules,
    type,
    size,
    placeholder,
    suffix,
    readOnly,
    mode,
    options,
    selectLoading
}) => {
    return (
        <Col key={key} span={span} md={md} lg={lg}>
            <Form.Item name={name} rules={rules}>
                {type === 'input' && <Input size={size} placeholder={placeholder} suffix={suffix} readOnly={readOnly} />}
                {type === 'select' && <Select mode={mode} size={size} placeholder={placeholder} options={options} loading={selectLoading} />}
                {type === 'date' && <DatePicker className="w-full" size={size} placeholder={placeholder} />}
            </Form.Item>
        </Col>
    )
}

export default FormItemCol
