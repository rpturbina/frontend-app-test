import useSWR from 'swr';

import userApi, { APIResponse } from '@/apis/userApi';
import { UserDetail } from '@/types';

const useUserId = (id: string) => {
  const userId = parseInt(id);
  const { data, error, isLoading, isValidating } = useSWR<
    APIResponse<UserDetail>,
    Error
  >(id ? `/user/$[id]` : null, () => userApi.getUserById(userId));

  return {
    user: data,
    isLoading,
    error,
    isValidating,
  };
};

export default useUserId;
