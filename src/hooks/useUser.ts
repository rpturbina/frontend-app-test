import useSWR from 'swr';

import * as React from 'react';

import { useAuth } from '@/context/auth';
import { API_BASE_URL } from '@/libs/api';
import fetcher from '@/libs/fetcher';
import { UserDetail, UserDetailDTO, UserList } from '@/types';

const useUser = () => {
  const auth = useAuth();
  const fetcherInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.token}`,
    },
  };
  const { data, error, isLoading, mutate } = useSWR(
    [`${API_BASE_URL}/user`, fetcherInit],
    ([url, init]) => fetcher(url, init)
  );

  const users: UserList = React.useMemo(
    () => data?.data.map((user: UserDetailDTO) => tranformUserDTOtoUser(user)),
    [data]
  );

  const newData = {
    ...data,
    data: users,
  };

  return {
    mutate,
    users: newData,
    isLoading,
    error,
  };
};

export default useUser;

const tranformUserDTOtoUser = (userDTO: UserDetailDTO): UserDetail => ({
  id: userDTO.id,
  name: userDTO.name,
  address: userDTO.address,
  gender: userDTO.gender === 'l' ? 'Laki-laki' : 'Perempuan',
  createdAt: userDTO.created_at,
  bornDate: userDTO.born_date,
});
