'use client';

import React from 'react';
import { ConfigProvider, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import Button from '@/components/shared/button';
import { useAppContext } from '@/context';

interface DataType {
  key: string;
  long_form: string;
  short_form: number;
  visited_times: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Long Form',
    dataIndex: 'long_form',
    key: 'long_form',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Short Form',
    dataIndex: 'short_form',
    key: 'short_form',
    width: '20rem',
  },
  {
    title: 'Visits',
    dataIndex: 'visits',
    key: 'visits',
    width: '5rem',
  },
  {
    title: 'Action',
    key: 'action',
    width: '12rem',
    render: (_, record) => (
      <Space className=' text-white' size="middle">
        <button className=' px-4 py-1 rounded text flex items-center justify-center bg-cl-rimary'>Copy</button>
        <button className=' px-4 py-1 rounded text flex items-center justify-center bg-red-500'>Delete</button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    long_form: 'John Brown',
    short_form: 32,
    visited_times : 3
  }
];

function Home() {

  const {user} = useAppContext()

  return (
    <div className="w-full overflow-hidden h-full flex flex-col items-center justify-center">
      <div className="h-16 text-white w-full bg-cl-rimary flex items-center justify-between border border-b-cl-rimary/40 p-4">
        <h3>My links</h3>{' '}
        <div className=" w-10 h-10 flex items-center justify-center text-cl-rimary rounded-full bg-white">
          {user?.username![0]}
        </div>
      </div>
      <div className="w-full flex items-center p-4 justify-end">
        <Button type="primary">+ New link</Button>
      </div>
      <div className=" overflow-hidden h-[calc(100%-2.5rem)] p-4  w-full">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2D3C7D',
              colorError: '#FE4D4F',
            },
          }}
        >
          <Table
            scroll={{  y: 300 }}
            bordered
            className="w-full"
            columns={columns}
            dataSource={data}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default Home;
