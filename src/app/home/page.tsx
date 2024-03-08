'use client';

import React, { useEffect, useState } from 'react';
import { ConfigProvider, Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
import Button from '@/components/shared/button';
import { useAppContext, useDispatchApp } from '@/context';
import ShortenLinkModal from '@/components/modals';
import APICall from '@/helpers/apiCall';
import { AxiosResponse } from 'axios';
import useAxiosAction from '@/hooks/useAction';

interface DataType {
  key: string;
  long_form: string;
  short_form: string;
  visited_times: number;
}

function Dashboard() {
  const { user, links, accessToken } = useAppContext();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [msg, msgContext] = message.useMessage();
  const dispatchApp = useDispatchApp();
  const appContext = useAppContext();

  // Delete link
  const deleteLink = (id: string): Promise<AxiosResponse<IAPIResponse<string>>> => {
    return APICall.delete('/links/delete/' + id, {}, accessToken);
  };

  // Get links
  const getLinks = (): Promise<AxiosResponse<IAPIResponse<ILink[]>>> => {
    return APICall.get('/links', {}, accessToken);
  };

  // Delete lilnk action
  const [deleteLinkAction, delState] = useAxiosAction<string, string>(deleteLink);

  // Get links action
  const [getLinksAction, getState] = useAxiosAction<ILink[]>(getLinks);

  useEffect(() => {
    getLinksAction();
  }, []);

  useEffect(() => {
    const error = delState.error?.response?.data;
    const data = delState.data?.data.data;

    if (error) {
      msg.error(error.message);
    }

    if (data) {
      msg.success(`Deleted successfully`);
      dispatchApp(() => ({ ...appContext, links: links?.filter(el => el.link.id !== data) }));
    }
  }, [delState.loading]);

  useEffect(() => {
    const error = getState.error?.response?.data;
    const data = getState.data?.data.data;

    if (error) {
      msg.error(error.message);
    }

    if (data) {
      dispatchApp(() => ({ ...appContext, links: data }));
    }
  }, [getState.loading]);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Long Form',
      dataIndex: 'long_form',
      key: 'long_form',
      render: data => (
        <a target="_blank" href={data}>
          {data}
        </a>
      ),
    },
    {
      title: 'Short Form',
      dataIndex: 'short_form',
      key: 'short_form',
      render: data => (
        <a target="_blank" href={data}>
          {data}
        </a>
      ),
      width: '20rem',
    },
    {
      title: 'Visits',
      dataIndex: 'visited_times',
      key: 'visited_times',
      width: '5rem',
    },
    {
      title: 'Action',
      key: 'action',
      width: '12rem',
      render: (_, record) => (
        <Space className=" text-white" size="middle">
          <button
            onClick={() => {
              msg.info(`Copied to clipboard !!!`);
              navigator.clipboard.writeText(record.short_form);
            }}
            className=" px-4 py-1 rounded text flex items-center justify-center bg-cl-rimary"
          >
            Copy
          </button>
          <button
            onClick={() => deleteLinkAction(record.key)}
            className=" px-4 py-1 rounded text flex items-center justify-center bg-red-500"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ShortenLinkModal open={modalOpen} setOpen={setModalOpen} />
      {msgContext}
      <div className="w-full overflow-hidden h-[100dvh] flex flex-col items-center justify-center">
        <div className="h-16 text-white w-full bg-cl-rimary flex items-center justify-between border-b-cl-rimary/40 p-4">
          <h3>My links</h3>{' '}
          <div className=" w-10 h-10 flex items-center justify-center text-cl-rimary rounded-full bg-white">
            {user?.username![0]}
          </div>
        </div>
        <div className="w-full flex items-center p-4 justify-end">
          <Button onClick={() => setModalOpen(true)} type="primary">
            + New link
          </Button>
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
              scroll={{ y: 300 }}
              bordered
              className="w-full"
              columns={columns}
              dataSource={links?.map((el, key) => {
                const long_form =
                  el.link.long_form.length < 250
                    ? el.link.long_form
                    : el.link.long_form.substring(0, 250) + ' ...';

                return {
                  key: el.link.id,
                  short_form: el.shortUrl,
                  long_form,
                  visited_times: el.link.visit_times,
                };
              })}
            />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
