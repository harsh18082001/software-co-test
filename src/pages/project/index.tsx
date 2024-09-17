import React, { FC, useState } from 'react';

import { Table, TableColumnsType } from 'antd';

import useFetch from 'src/hooks';
import TitleBar from 'src/components/titel-bar';
import ProjectFilters from 'src/pages/project/filters';

interface DataType {
  key?: React.Key;
  customer: string;
  ref_number: string;
  project_name: string;
  project_number: string;
  area_location: string;
  address: string;
  status: string;
}

const defaultColumns: TableColumnsType<DataType> = [
  { title: 'CUSTOMER', key: 'customer', dataIndex: 'customer' },
  { title: 'REF NUMBER', key: 'ref_number', dataIndex: 'ref_number' },
  {
    title: 'PROJECT REFERENCE',
    key: 'project_reference',
    dataIndex: 'project_reference',
    children: [
      { title: 'PROJECT NAME', key: 'project_name', dataIndex: 'project_name' },
      { title: 'PROJECT NUMBER', key: 'project_number', dataIndex: 'project_number' },
    ]
  },
  {
    title: 'PROJECT LOCATION',
    key: 'project_location',
    dataIndex: 'project_location',
    children: [
      { title: 'AREA LOCATION', key: 'area_location', dataIndex: 'area_location' },
      { title: 'ADDRESS', key: 'address', dataIndex: 'address' },
    ]
  },
  { title: 'STATUS', key: 'status', dataIndex: 'status' },
];

const Project: FC = () => {
  const [data, loading] = useFetch<DataType[]>('/project');

  const [columns, setColumns] = useState(defaultColumns);

  const handleToggleColumn = (key: string, value: boolean) => {
    const updateColumns: any = (columns: TableColumnsType<DataType>) => {
      return columns.map((column: any) => {
        if (column?.key === key) {
          return { ...column, hidden: !value };
        }
        if (column?.children) {
          // Recursively update children columns
          return { ...column, children: updateColumns(column.children) };
        }
        return column;
      });
    };

    const updatedColumns = updateColumns(columns);
    setColumns(updatedColumns);
  };

  return (
    <>
      <TitleBar
        title="PROJECTS"
        addText="ADD_PROJECT"
        filters={<ProjectFilters columns={columns} data={data} onToggleCol={handleToggleColumn} />}
      />
      <Table
        bordered
        size="small"
        loading={loading}
        pagination={{ size: 'default' }}
        columns={columns.filter(column => !column.hidden)} // Filter out hidden columns
        dataSource={data!}
      />
    </>
  );
};

export default Project;
