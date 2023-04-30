import { Link } from 'react-router-dom';

import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

const ViewUserDetailButton = ({ id }: { id: string }) => {
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
    <Link to={`/user/${id}`}>
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
