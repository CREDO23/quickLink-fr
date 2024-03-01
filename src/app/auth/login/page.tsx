/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { defaultValues, loginSchema } from './validation';
import Button from '@/components/shared/button';
import Input from '@/components/shared/input';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import useAxiosAction from '@/hooks/useAction';
import { AxiosResponse } from 'axios';
import APICall from '@/helpers/apiCall';
import { message } from 'antd';
import { useDispatchApp, useAppContext } from '@/context';

export default function Register(): JSX.Element {
  const router = useRouter();
  const dispatchApp = useDispatchApp();
  const appContext = useAppContext();

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: joiResolver(loginSchema),
    reValidateMode: 'onChange',
  });

  // Login user
  const loginUser = (
    user: IUser
  ): Promise<AxiosResponse<IAPIResponse<{ user: IUser; accessToken: string }>>> => {
    return APICall.post('/auth/signin', { data: user }, '');
  };

  // Login user action
  const [loginUserAction, state] = useAxiosAction<
    { user: IUser; accessToken: string },
    { username: string; password: string }
  >(loginUser);

  const onSubmit = (data: { username: string; password: string }) => {
    loginUserAction(data);
  };

  const [msg, msgContext] = message.useMessage();

  useEffect(() => {
    const error = state.error?.response?.data;
    const data = state.data?.data.data;

    if (error?.error) {
      msg.error(error.message);
    }

    if (data) {
      msg.success(`Logged as ${data.user.username}`);
      dispatchApp(() => ({ ...appContext, user: data.user, accessToken: data.accessToken }));
      router.push('/home');
    }
  }, [state.loading]);

  return (
    <>
      {msgContext}
      <div className=" w-full h-full flex flex-col items-center py-10 gap-6">
        <h3 className=" text-4xl sm:text-2xl font-medium">Sign In</h3>
        <div className="w-full p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" text-sm sm:text-xs font-light flex flex-col gap-10 "
          >
            <div className="flex w-full flex-col gap-4">
              <Controller
                name="username"
                control={control}
                render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                  <Input
                    size="large"
                    label="Username"
                    placeholder="Enter your username"
                    refEl={ref}
                    {...fields}
                    error={error?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                  <Input
                    size="large"
                    label="Passord"
                    placeholder="Enter your password"
                    type="password"
                    refEl={ref}
                    {...fields}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <div className="w-full flex flex-col py-4 gap-3 items-center">
              <Button loading={state.loading} size="big" type="primary" block>
                Sign In
              </Button>

              <p className="flex items-center justify-center gap-2">
                <span>Don&apos;t have an account ?</span>

                <Link href={'/auth/register'}>
                  <span className=" text-cl-rimary cursor-pointer font-normal text-primary">
                    Register
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
