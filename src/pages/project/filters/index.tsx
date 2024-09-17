import React, { FC } from 'react';

import { ConfigProvider, DatePicker, DatePickerProps, Popover, Radio, Tag, theme } from 'antd';
import { ReloadOutlined } from '@ant-design/icons'

import FilterIcon from 'src/assets/icons/filter-icon';

const ProjectFilters: FC<any> = ({ columns, data, onToggleCol }) => {
    const { token: { colorText } } = theme.useToken();
    const uniqueStatusList = [...new Set(data.map(({ status }: any) => status))];


    const renderColumnTags = (columns: any) => {
        return columns.map((column: any) => (
            <React.Fragment key={column?.key}>
                <Tag.CheckableTag
                    checked={!column.hidden}
                    onChange={(checked) => onToggleCol(column.key, checked)}
                    className="mr-0"
                >
                    {column?.title}
                </Tag.CheckableTag>
                {column?.children && renderColumnTags(column.children)}
            </React.Fragment>
        ));
    };

    const hideColumnsContent = (
        <div className="w-[310px]">
            <div className="mb-3">Select Columns</div>
            <div className="flex flex-wrap gap-1.5">
                {renderColumnTags(columns)}
            </div>
        </div>
    );

    const statusContent = (
        <div className="w-[310px]">
            <div className="mb-3">Select Columns</div>
            <div className="flex flex-wrap gap-1.5">
                {uniqueStatusList.map((status: any) =>
                    <React.Fragment key={status}>
                        <Tag.CheckableTag
                            checked={true}
                        // onChange={(checked) => onToggleCol(column.key, checked)}
                        // className="mr-0"
                        >
                            {status}
                        </Tag.CheckableTag>
                    </React.Fragment>)}
            </div>
        </div>
    );

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <ConfigProvider
            wave={{ disabled: true }}
            theme={{ components: { Radio: { colorPrimary: colorText, colorPrimaryHover: colorText } } }}
        >
            <Radio.Group className="flex">
                <Radio.Button className="inline-flex h-12 items-center justify-center py-2 leading-none">
                    <FilterIcon />
                </Radio.Button>
                <Radio.Button className="inline-flex h-12 items-center justify-center py-2 leading-none">Filter By</Radio.Button>
                <Radio.Button className="inline-flex h-12 items-center justify-center py-2 leading-none">
                    <DatePicker bordered={false} onChange={onChange} />
                </Radio.Button>
                <Radio.Button className="inline-flex h-12 items-center justify-center py-2 leading-none">
                    <Popover placement="bottomRight" content={hideColumnsContent} trigger="click">
                        Hide Columns
                    </Popover>
                </Radio.Button>
                <Radio.Button className="inline-flex h-12 items-center justify-center py-2 leading-none">
                    <Popover placement="bottomRight" content={statusContent} trigger="click">
                        Status
                    </Popover>
                </Radio.Button>
                <Radio.Button className="inline-flex h-12 items-center justify-center py-2 leading-none">
                    <div className="flex gap-1">
                        <ReloadOutlined />
                        Reset Filter
                    </div>
                </Radio.Button>
            </Radio.Group>
        </ConfigProvider>
    );
};

export default ProjectFilters;
