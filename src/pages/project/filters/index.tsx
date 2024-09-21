import React, { CSSProperties, FC } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { ConfigProvider, DatePicker, Popover, Radio, Tag, theme } from 'antd';
import FilterIcon from 'src/assets/icons/filter-icon';

interface ProjectFiltersProps {
    columns: any;
    data: any;
    onToggleCol: (key: string, value: boolean) => void;
    reload: () => void;
    dateFilterChange: (dates: any) => void;
    onStatusFilterChange?: (status: string, checked: boolean) => void;
    selectedStatuses: string[];
}

const ProjectFilters: FC<ProjectFiltersProps> = ({
    columns,
    data,
    onToggleCol,
    reload,
    dateFilterChange,
    selectedStatuses
}) => {
    const uniqueStatusList = [...new Set(data?.map(({ status }: any) => status))];

    const { token: { colorText, colorBorderSecondary } } = theme.useToken();
    const radioBorder: { style: CSSProperties } = { style: { borderColor: colorBorderSecondary, color: colorText } };

    const renderColumnTags = (columns: any) => {
        return columns.map(({ key, title, hidden, children }: any) => (
            <React.Fragment key={key}>
                <Tag.CheckableTag className="mr-0" checked={!hidden} onChange={(checked) => onToggleCol(key, checked)}>{title}</Tag.CheckableTag>
                {children && renderColumnTags(children)}
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
            <div className="mb-3">Select Status</div>
            <div className="flex flex-wrap gap-1.5">
                {uniqueStatusList.map((status: any) => (
                    <React.Fragment key={status}>
                        <Tag.CheckableTag
                            checked={selectedStatuses.includes(status)}
                            className="mr-0"
                        // onChange={(checked) => onStatusFilterChange(status, checked)}
                        >
                            {status}
                        </Tag.CheckableTag>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );

    return (
        <ConfigProvider wave={{ disabled: true }}>
            <Radio.Group className="flex">
                <Radio.Button {...radioBorder} className="before:!hidden inline-flex h-9 items-center justify-center py-2 px-3 leading-none">
                    <FilterIcon />
                </Radio.Button>
                <Radio.Button {...radioBorder} className="before:!hidden inline-flex h-9 items-center justify-center py-2 px-3 leading-none">Filter By</Radio.Button>
                <Radio.Button {...radioBorder} className="before:!hidden inline-flex h-9 items-center justify-center py-0 px-3 leading-none">
                    <DatePicker.RangePicker bordered={false} format="DD-MM-YYYY" onChange={dateFilterChange} />
                </Radio.Button>
                <Popover placement="bottomRight" content={hideColumnsContent} trigger="click">
                    <Radio.Button {...radioBorder} className="before:!hidden inline-flex h-9 items-center justify-center py-2 px-3 leading-none">Hide Columns</Radio.Button>
                </Popover>
                <Popover placement="bottomRight" content={statusContent} trigger="click">
                    <Radio.Button {...radioBorder} className="before:!hidden inline-flex h-9 items-center justify-center py-2 px-3 leading-none">Status</Radio.Button>
                </Popover>
                <Radio.Button {...radioBorder} className="before:!hidden inline-flex h-9 items-center justify-center py-2 px-3 leading-none before:!w-0" onClick={reload}>
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
