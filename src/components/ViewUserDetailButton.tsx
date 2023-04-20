import { Link } from 'react-router-dom';

import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { useAuth } from '@/context/auth';
import { prefetchUserId } from '@/hooks/useUserId';

const ViewUserDetailButton = ({ id }: { id: string }) => {
  const auth = useAuth();
  const handleMouseEnter = () => {
    prefetchUserId(id, auth.token);
  };

  if (id === undefined) {
    return (
      <IconButton
        variant={'outline'}
        icon={<ViewIcon />}
        aria-label="View user detail"
        size={'sm'}
        border={'none'}
      />
    );
  }
  return (
    <Link to={`/user/${id}`} onMouseEnter={handleMouseEnter}>
      <IconButton
        variant={'outline'}
        icon={<ViewIcon />}
        aria-label="View user detail"
        size={'sm'}
        border={'none'}
      />
    </Link>
  );
};

export default ViewUserDetailButton;
