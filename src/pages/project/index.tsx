import React, { FC, useMemo, useState, useCallback } from 'react';

import { Table, TableColumnsType, Tag } from 'antd';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import useFetch from 'src/hooks';
import TitleBar from 'src/components/titel-bar';
import ProjectFilters from 'src/pages/project/filters';
import { updateData } from 'src/store/slices/project';

dayjs.extend(isBetween);

export interface DataType {
  key?: React.Key;
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
  staff: string;
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
const renderStatus = (status: string) => {
  return <Tag color={statusColorMap[status] || statusColorMap['default']}>{status}</Tag>;
};

const defaultColumns: TableColumnsType<DataType> = [
  { title: 'CREATED AT', key: 'created_at', dataIndex: 'created_at', render: renderDate },
  { title: 'UPDATED AT', key: 'updated_at', dataIndex: 'updated_at', render: renderDate },
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
];

const Project: FC = () => {

  const [data, loading, setData, reload] = useFetch<DataType[]>('/project', null, updateData);

  const [columns, setColumns] = useState(defaultColumns);
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
          <ProjectFilters
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
        pagination={{ size: 'default' }}
        columns={filteredColumns}
        dataSource={data || []}
      />
    </>
  );
};

export default Project;