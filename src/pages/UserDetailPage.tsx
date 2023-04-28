import { MdLogout } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';

import { Button, Flex } from '@chakra-ui/react';

import Layout from '@/components/Layout';
import UserDetailCard from '@/components/UserDetailCard';
import UserDetailCardSkeleton from '@/components/UserDetailCardSkeleton';

import useUserId from '@/hooks/useUserId';

const UserDetailPage = () => {
  const { id } = useParams();
  const { user, isLoading } = useUserId(id);

  return (
    <Layout>
      <Flex
        _dark={{
          bg: '#3e3e3e',
        }}
        w="full"
        alignItems="center"
        justifyContent="center"
        minH={'100vh'}
        direction={'column'}
      >
        {isLoading ? (
          <UserDetailCardSkeleton />
        ) : (
          <UserDetailCard user={user?.data} />
        )}
        <Link to={'/dashboard'}>
          <Button
            size={['xs', 'sm']}
            leftIcon={<MdLogout />}
            colorScheme="blue"
            variant={'ghost'}
            mt={6}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            marginRight={'auto'}
          >
            Back to Dashboard
          </Button>
        </Link>
      </Flex>
    </Layout>
  );
};

export default UserDetailPage;
