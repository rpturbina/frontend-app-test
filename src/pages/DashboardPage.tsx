import useSWR from 'swr';

import * as React from 'react';

import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import AddUserModal from '@/components/AddUserModal';
import DashboardLayout from '@/components/DashboardLayout';
import UserTable from '@/components/UserTable';
import UserTableSkeleton from '@/components/UserTableSkeleton';

import { useAuth } from '@/context/auth';
// import { getAllUser } from '@/lib/service';
import { UserList } from '@/types';

const initialUsers: UserList = [
  {
    name: 'Asep',
    address: 'Nagrek',
    gender: 'Pria',
    bornDate: '23 May 1990',
    createdAt: '26 Jan 2023 11:04',
  },
  {
    name: 'Septian',
    address: 'Bandung',
    gender: 'Pria',
    bornDate: '28 September 1990',
    createdAt: '28 Jan 2023 12:22',
  },
];

const DashboardPage = () => {
  const auth = useAuth();

  const { data, isLoading } = useSWR<UserList | null>(
    'https://cms-admin-v2.ihsansolusi.co.id/testapi/user',
    (url) =>
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => res.json())
  );
  console.log(data);

  return (
    <DashboardLayout>
      <Button onClick={auth.logout}>Logout</Button>
      <Box bg={'white'} borderRadius={'lg'} p={6} boxShadow={'md'}>
        <Flex justify={'space-between'} align={'center'} columnGap={2}>
          <Heading as={'h2'} size={['sm', 'md']}>
            Users Table
          </Heading>
          <AddUserModal />
        </Flex>
        {isLoading ? <UserTableSkeleton /> : <UserTable users={initialUsers} />}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
