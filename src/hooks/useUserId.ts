import useSWR, { preload } from 'swr';

import * as React from 'react';

import { useAuth } from '@/context/auth';
import { API_BASE_URL } from '@/libs/api';
import fetcher from '@/libs/fetcher';

export const prefetchUserId = (id: string, token: string | null) => {
  const fetcherInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return preload(
    id ? [`${API_BASE_URL}/user/${id}`, fetcherInit] : null,
    ([url, init]) => fetcher(url, init)
  );
};

const useUserId = (id?: string) => {
  const auth = useAuth();
  const fetcherInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
    },
  };
  const { data, error, isLoading, isValidating } = useSWR(
    id ? [`${API_BASE_URL}/user/${id}`, fetcherInit] : null,
    ([url, init]) => fetcher(url, init)
  );

  console.log(data, 'getUser');

  // const users: UserList = React.useMemo(
  //   () =>
  //     data?.data.sort((a: { id: number }, b: { id: number }) => a.id - b.id) ||
  //     [],
  //   [data]
  // );

  // const newData = {
  //   ...data,
  //   data: users,
  // };

  return {
    user: data,
    isLoading,
    error,
    isValidating,
  };
};

export default useUserId;
