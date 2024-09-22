import React, { FC, useMemo, useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { Button, Popconfirm, Table, TableColumnsType, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import store from 'src/store';
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
  due_date: string;
  customer: string;
  ref_number: string;
  project_name: string;
  project_number: string;
  area_location: string;
  address: string;
  status: string;
  contact: string;
  manager: string;
  staff: string[];
  email: string;
}

const statusColorMap: { [key: string]: string } = {
  'Completed': 'green',
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
const renderUserName = (...userIds: string[]) => {
  const all_users = store.getState().auth.all_users;
  const userIdMap = all_users.reduce((acc: any, user: any) => {
    acc[user.id] = user.user_name;
    return acc;
  }, {});
  return userIds.map(id => userIdMap[id] || null).join(', ');
}

const deleteRecord = async (id: string, reload: () => void) => {
  await postData({ url: `/project/${id}`, method: 'delete' });
  reload();
}

const renderActions = (_: any, record: DataType, reload: () => void) =>
  <div className="flex gap-2">
    <Link to={`/project/${record?.id}`}><Button icon={<EditOutlined />} /></Link>
    <Popconfirm title="Are you sure, you want to delete this record?" onConfirm={async () => await deleteRecord(record?.id || '', reload)}>
      <Button icon={<DeleteOutlined />} danger />
    </Popconfirm>
  </div>

const defaultColumns = (reload: () => void): TableColumnsType<DataType> => [
  { title: 'CREATED AT', key: 'created_at', dataIndex: 'created_at', render: renderDate, sorter: sorterDate, defaultSortOrder: 'descend' },
  { title: 'UPDATED AT', key: 'updated_at', dataIndex: 'updated_at', render: renderDate, sorter: sorterDate, },
  { title: 'DUE DATE', key: 'due_date', dataIndex: 'due_date', render: renderDate, sorter: sorterDate, },
  { title: 'ACTION', key: 'action', dataIndex: 'action', render: (_: any, record: DataType) => renderActions(_, record, reload) },
  { title: 'CUSTOMER', key: 'customer', dataIndex: 'customer' },
  { title: 'REF NUMBER', key: 'ref_number', dataIndex: 'ref_number' },
  {
    title: 'PROJECT REFERENCE', key: 'project_reference', dataIndex: 'project_reference',
    children: [
      { title: 'PROJECT NAME', key: 'project_name', dataIndex: 'project_name' },
      { title: 'PROJECT NUMBER', key: 'project_number', dataIndex: 'project_number' },
    ]
  },
  {
    title: 'PROJECT LOCATION', key: 'project_location', dataIndex: 'project_location',
    children: [
      { title: 'AREA LOCATION', key: 'area_location', dataIndex: 'area_location' },
      { title: 'ADDRESS', key: 'address', dataIndex: 'address' },
    ]
  },
  { title: 'STATUS', key: 'status', dataIndex: 'status', render: renderStatus },
  { title: 'CONTACT', key: 'contact', dataIndex: 'contact' },
  { title: 'MANAGER', key: 'manager', dataIndex: 'manager', render: (field: string) => renderUserName(field), width: 150 },
  { title: 'STAFF', key: 'staff', dataIndex: 'staff', render: (field: string[]) => renderUserName(...field), width: 300 },
  { title: 'EMAIL', key: 'email', dataIndex: 'email' },
];

const Project: FC = () => {

  const [data, loading, setData, reload] = useGet<DataType[]>('/project');

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
        title="PROJECTS"
        addText="ADD_PROJECT"
        addPath="/project/add"
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
        bordered
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

export default Project;