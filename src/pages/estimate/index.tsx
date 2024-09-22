import React, { FC, useMemo, useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { Button, Popconfirm, Table, TableColumnsType, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import useGet from 'src/hooks';
import { postData } from 'src/utils';
import TitleBar from 'src/components/titel-bar';
import Filters from 'src/components/filters';

dayjs.extend(isBetween);

export interface DataType {
  key?: React.Key;
  id?: string;
  created_at: string;
  updated_at: string;
  project: string;
  version: string;
  name: string;
  desc: string;
  unit: string;
  quantity: number;
  price: number;
  margin_pr: number;
  total: number;
  status: string;
}

const statusColorMap: { [key: string]: string } = {
  'Created': 'green',
  'In Transit': 'blue',
  'Processing': 'orange',
  'On Hold': 'purple',
  'Rejected': 'red',
  'default': 'default'
};

const renderDate = (value: any) => dayjs(value).format('DD-MM-YYYY');
const sorterDate = (a: any, b: any) => dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? 1 : -1;
const renderStatus = (status: string) => {
  return <Tag color={statusColorMap[status] || statusColorMap['default']}>{status}</Tag>;
};

const deleteRecord = async (id: string, reload: () => void) => {
  await postData({ url: `/estimate/${id}`, method: 'delete' });
  reload();
}

const renderActions = (_: any, record: DataType, reload: () => void) =>
  <div className="flex gap-2">
    <Link to={`/estimate/${record?.id}`}><Button icon={<EditOutlined />} /></Link>
    <Popconfirm title="Are you sure, you want to delete this record?" onConfirm={async () => await deleteRecord(record?.id || '', reload)}>
      <Button icon={<DeleteOutlined />} danger />
    </Popconfirm>
  </div>

const defaultColumns = (reload: () => void): TableColumnsType<DataType> => [
  { title: 'CREATED AT', key: 'created_at', dataIndex: 'created_at', render: renderDate, sorter: sorterDate, defaultSortOrder: 'descend' },
  { title: 'UPDATED AT', key: 'updated_at', dataIndex: 'updated_at', render: renderDate, sorter: sorterDate, },
  { title: 'ACTION', key: 'action', dataIndex: 'action', render: (_: any, record: DataType) => renderActions(_, record, reload) },
  { title: 'PROJECT', key: 'project', dataIndex: 'project' },
  { title: 'VERSION', key: 'version', dataIndex: 'version' },
  { title: 'NAME', key: 'name', dataIndex: 'name' },
  { title: 'DESCRIPTION', key: 'desc', dataIndex: 'desc' },
  { title: 'UNIT', key: 'unit', dataIndex: 'unit' },
  { title: 'Quantity', key: 'quantity', dataIndex: 'quantity' },
  { title: 'PRICE', key: 'price', dataIndex: 'price' },
  { title: 'Margin', key: 'margin_pr', dataIndex: 'margin_pr' },
  { title: 'TOTAL', key: 'total', dataIndex: 'total' },
  { title: 'STATUS', key: 'status', dataIndex: 'status', render: renderStatus },
];

const Estimate: FC = () => {

  const [data, loading, setData, reload] = useGet<DataType[]>('/estimate');

  const [columns, setColumns] = useState(defaultColumns(reload));
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleToggleColumn = useCallback((key: string, value: boolean) => {
    const updateColumns = (columns: TableColumnsType<DataType>): TableColumnsType<DataType> => {
      return columns.map((column: any) => {
        if (column?.key === key) return { ...column, hidden: !value };
        if (column?.children) return { ...column, children: updateColumns(column.children) };
        return column;
      });
    };
    setColumns(updateColumns(columns));
  }, [columns]);

  const dateFilterChange = (dates: any) => {
    if (dates) {
      const [start, end] = dates;
      const filteredData =
        (data || []).filter(({ created_at, updated_at }) =>
          dayjs(created_at).isBetween(start, end, 'day', '[]') ||
          dayjs(updated_at).isBetween(start, end, 'day', '[]')
        );
      setData(filteredData);
    } else {
      reload();
    }
  };

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    const nextSelectedStatuses = checked ? [...selectedStatuses, status] : selectedStatuses.filter(s => s !== status);
    setSelectedStatuses(nextSelectedStatuses);
    const filteredData = (data || []).filter(({ status }) => (nextSelectedStatuses.length === 0 || nextSelectedStatuses.includes(status)));
    setData(filteredData);
  };

  const filteredColumns = useMemo(() => columns.filter(column => !column.hidden), [columns]);

  return (
    <>
      <TitleBar
        title="ESTIMATES"
        addText="ADD_ESTIMATE"
        addPath="/estimate/add"
        filters={
          <Filters
            columns={columns}
            data={data}
            onToggleCol={handleToggleColumn}
            reload={reload}
            dateFilterChange={dateFilterChange}
            onStatusFilterChange={handleStatusFilterChange}
            selectedStatuses={selectedStatuses}
          />
        }
      />
      <Table
        size="small"
        loading={loading}
        scroll={{ x: 'max-content' }}
        pagination={{ size: 'default' }}
        columns={filteredColumns}
        dataSource={data || []}
      />
    </>
  );
};

export default Estimate;