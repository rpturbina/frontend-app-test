import useSWR from 'swr';

import userApi, { APIResponse } from '@/apis/userApi';

const useUser = () => {
  const { data, error, isLoading, mutate, isValidating } = useSWR<
    APIResponse<UserList>,
    Error
  >('/user', () => userApi.getAllUser());

  const users = data?.data?.sort((a, b) => a.id - b.id) || [];

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
