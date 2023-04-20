import useSWR from 'swr';

import * as React from 'react';

import { useAuth } from '@/context/auth';
import { API_BASE_URL } from '@/libs/api';
import fetcher from '@/libs/fetcher';
import { UserList } from '@/types';

const useUser = () => {
  const auth = useAuth();
  const fetcherInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
    },
  };
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    [`${API_BASE_URL}/user`, fetcherInit],
    ([url, init]) => fetcher(url, init)
  );

  // console.log(data, 'getUsers');

  const users: UserList = React.useMemo(
    () =>
      data?.data.sort((a: { id: number }, b: { id: number }) => a.id - b.id) ||
      [],
    [data]
  );

  const newData = {
    ...data,
    data: users,
  };

  return {
    mutateUser: mutate,
    users: newData,
    isLoading,
    error,
    isValidating,
  };
};

export default useUser;
