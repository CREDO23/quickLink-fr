import { useDispatchApp, useAppContext } from '@/context';
import APICall from '@/helpers/apiCall';
import useAxiosAction from '@/hooks/useAction';
import { joiResolver } from '@hookform/resolvers/joi';
import { ConfigProvider, Modal, message } from 'antd';
import { AxiosResponse } from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createLinkSchema, defaultValues } from './validation';
import Input from '../shared/input';
import Button from '../shared/button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IShortenLinkModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ShortenLinkModal({ open, setOpen }: IShortenLinkModalProps): JSX.Element {
  const dispatchApp = useDispatchApp();
  const appContext = useAppContext();

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: joiResolver(createLinkSchema),
    reValidateMode: 'onChange',
  });

  // Shorten the link
  const shortenLink = (data: { url: string }): Promise<AxiosResponse<IAPIResponse<ILink>>> => {
    return APICall.post('/links/shorten', { data }, appContext.accessToken);
  };

  // Shorten link action
  const [createLinkAction, state] = useAxiosAction<ILink, { url: string }>(shortenLink);

  const onSubmit = (data: { url: string }) => {
    createLinkAction(data);
  };

  const [msg, msgContext] = message.useMessage();

  useEffect(() => {
    const error = state.error?.response?.data;
    const data = state.data?.data.data;

    if (error?.error) {
      msg.error(error.message);
    }

    if (data) {
      msg.success('Successfully shortened');
      dispatchApp(() => ({ ...appContext, links: [...appContext.links, data] }));
      setOpen(false);
    }
  }, [state.loading]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2D3C7D',
          colorError: '#FE4D4F',
        },
      }}
    >
      <Modal
        title="New Link"
        width={400}
        centered={true}
        open={open}
        confirmLoading={state.loading}
        onCancel={() => setOpen(false)}
        footer={
          <div className="w-full h-full  items-center flex justify-end">
            <Button onClick={handleSubmit(onSubmit)} type="primary">
              {state.loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : 'OK'}
            </Button>
          </div>
        }
      >
        {msgContext}
        <div className="w-full p-4">
          <div className="flex w-full flex-col gap-4">
            <Controller
              name="url"
              control={control}
              render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                <Input
                  size="large"
                  label="Url"
                  placeholder="Enter the URL you want to shorten"
                  refEl={ref}
                  {...fields}
                  error={error?.message}
                />
              )}
            />
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
