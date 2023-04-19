import { Box, Button, Flex, Heading } from '@chakra-ui/react';

import AddUserModal from '@/components/AddUserModal';
import DashboardLayout from '@/components/DashboardLayout';
import UserTable from '@/components/UserTable';
import UserTableEmpty from '@/components/UserTableEmpty';
import UserTableSkeleton from '@/components/UserTableSkeleton';

import { useAuth } from '@/context/auth';
import useUser from '@/hooks/useUser';

const DashboardPage = () => {
  const auth = useAuth();
  const { users, isLoading } = useUser();

  let tableContent;

  if (isLoading) {
    tableContent = <UserTableSkeleton />;
  } else {
    tableContent =
      users?.data?.length === 0 ? (
        <UserTableEmpty />
      ) : (
        <UserTable users={users.data} />
      );
  }

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
        {tableContent}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
