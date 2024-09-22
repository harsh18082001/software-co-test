import { ReactNode } from "react";

import { SizeType } from "antd/es/config-provider/SizeContext";
import { Rule } from "antd/es/form";
import { DefaultOptionType } from "antd/es/select";

interface IFormConfig {
    name?: string;
    rules?: Rule[] | undefined;
    placeholder?: string;
    readOnly?: boolean;
    type?: 'input' | 'select' | 'date';
    mode?: 'multiple',
    size?: SizeType;
    suffix?: ReactNode,
    options?: DefaultOptionType[] | undefined,
    selectLoading?: boolean;
    data?: IFormConfig[];
}

const configureFormFeilds = (statusList: any, statusListLoading: boolean, index: number): IFormConfig[][] => [
    [
        {
            name: `project_${index}`,
            rules: [{ required: true }],
            placeholder: 'Project name',
            type: 'input',
        },
        {
            name: `status_${index}`,
            rules: [{ required: true }],
            placeholder: 'Estimate status',
            type: 'select',
            selectLoading: statusListLoading,
            options: statusList?.estimate_status?.map((value: any) => ({ value }))
        },
        {
            name: `version_${index}`,
            rules: [{ required: true }],
            placeholder: 'Project version',
            type: 'input',
        },
        {
            name: `grandTotal_${index}`,
            placeholder: '00.00',
            readOnly: true,
            suffix: '$',
            type: 'input',
        },
        {
            data: [
                {
                    name: `name_${index}#${index}`,
                    rules: [{ required: true }],
                    placeholder: 'Item Name',
                    type: 'input'
                },
                {
                    name: `desc_${index}#${index}`,
                    rules: [{ required: true }],
                    placeholder: 'Item Description',
                    type: 'input'
                },
                {
                    name: `unit_${index}#${index}`,
                    rules: [{ required: true }],
                    placeholder: 'Unit',
                    type: 'input'
                },
                {
                    name: `quantity_${index}#${index}`,
                    rules: [{ required: true, pattern: /^[0-9]+$/, message: 'Input is not valid' }],
                    placeholder: 'Quantity',
                    type: 'input'
                },
                {
                    name: `price_${index}#${index}`,
                    rules: [{ required: true, pattern: /^[0-9]+$/, message: 'Input is not valid' }],
                    placeholder: 'Price',
                    type: 'input'
                },
                {
                    name: `margin_pr_${index}#${index}`,
                    rules: [{ required: true, pattern: /^(?:[1-9]?\d|100)$/, max: 100, message: 'Input is not valid' }],
                    suffix: '%',
                    placeholder: 'Margin percentage',
                    type: 'input'
                },
                {
                    name: `total_${index}#${index}`,
                    readOnly: true,
                    placeholder: 'Total',
                    type: 'input'
                },
            ],
        }
    ],
]

export type { IFormConfig }
export { configureFormFeilds }