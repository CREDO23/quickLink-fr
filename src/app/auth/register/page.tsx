'use client';
/* eslint-disable react-hooks/exhaustive-deps */

import Button from '@/components/shared/button';
import Input from '@/components/shared/input';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { registerSchema, defaultValues } from './validation';
import Link from 'next/link';
import APICall from '@/helpers/apiCall';
import useAxiosAction from '@/hooks/useAction';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import { useAppContext, useDispatchApp } from '@/context';

export default function Register(): JSX.Element {
  const router = useRouter();
  const dispatchApp = useDispatchApp();
  const appContext = useAppContext();

  // Form handling
  const { control, handleSubmit } = useForm({
    resolver: joiResolver(registerSchema),
    defaultValues,
    reValidateMode: 'onChange',
  });

  //Register user
  const registerUser = async ({
    confirmPassword,
    ...rest
  }: IUser): Promise<AxiosResponse<IAPIResponse<{ user: IUser; accessToken: string }>>> => {
    return await APICall.post('auth/signup', { data: rest }, '');
  };

  // Register action
  const [registerUserAction, state] = useAxiosAction<{ user: IUser; accessToken: string }, IUser>(
    registerUser
  );

  const onSubmit = async (user: IUser) => {
    await registerUserAction(user);
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
      <div className=" w-full h-full flex flex-col justify-center items-center py-10 gap-6">
        <h3 className=" text-4xl sm:text-2xl font-medium">Register</h3>
        <div className="w-full p-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" text-sm sm:text-xs font-light flex flex-col gap-10 "
          >
            <div className="flex w-full flex-col gap-4">
              <Controller
                name="username"
                control={control}
                render={({ field: { ref, ...fileds }, fieldState: { error } }) => (
                  <Input
                    size="large"
                    label="Name"
                    placeholder="Enter your name"
                    {...fileds}
                    refEl={ref}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                  <Input
                    size="large"
                    label="Email"
                    placeholder="Enter your email"
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

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { ref, ...fields }, fieldState: { error } }) => (
                  <Input
                    size="large"
                    label="Passord"
                    placeholder="Confirm your password"
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
                Register
              </Button>

              <p className="flex items-center justify-center gap-2">
                <span>Already have an account ?</span>

                <Link href={'/auth/login'}>
                  <span className=" text-cl-rimary cursor-pointer font-normal text-primary">
                    Login
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
