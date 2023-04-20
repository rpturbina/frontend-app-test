import { MdLogout } from 'react-icons/md';

import { Box, Button, Flex, Heading, Spinner } from '@chakra-ui/react';

import AddUserModal from '@/components/AddUserModal';
import DashboardLayout from '@/components/DashboardLayout';
import UserTable from '@/components/UserTable';
import UserTableEmpty from '@/components/UserTableEmpty';
import UserTableSkeleton from '@/components/UserTableSkeleton';

import { useAuth } from '@/context/auth';
import useUser from '@/hooks/useUser';

const DashboardPage = () => {
  const auth = useAuth();
  const { users, isLoading, isValidating } = useUser();

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
      {/* <Button onClick={auth.logout}>Logout</Button> */}
      <Button
        size={['xs', 'sm']}
        onClick={auth.logout}
        leftIcon={<MdLogout />}
        colorScheme="blue"
        variant={'ghost'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        marginRight={'auto'}
      >
        Logout
      </Button>
      <Box bg={'white'} borderRadius={'lg'} p={6} boxShadow={'md'} mt={4}>
        <Flex justify={'space-between'} align={'center'} columnGap={2}>
          <Heading as={'h2'} size={['sm', 'md']}>
            Users Table
          </Heading>
          {isValidating && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              colorScheme="blue"
              marginRight={'auto'}
              opacity={'0.6'}
              marginLeft={'0.5rem'}
              display={['none', 'block']}
            />
          )}
          <AddUserModal />
        </Flex>
        {tableContent}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardPage;
