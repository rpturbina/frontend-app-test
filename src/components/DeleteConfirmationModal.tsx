import * as React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { useAuth } from '@/context/auth';
import useUser from '@/hooks/useUser';
import { deleteUser } from '@/libs/api';
import { UserDetail } from '@/types';

type DeleteConfirmationModalProps = {
  id: number;
  children: (onOpen: () => void) => React.ReactNode;
};

const DeleteConfirmationModal = ({
  id,
  children,
}: DeleteConfirmationModalProps) => {
  const auth = useAuth();
  const toast = useToast();
  const { mutateUser, users } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const { isOk, error } = await deleteUser(id, auth.token);

    if (isOk) {
      const newUsers = users.data.filter((user: UserDetail) => user.id !== id);
      mutateUser({ ...users, data: newUsers });
      toast({
        title: 'User deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    if (!isOk) {
      toast({
        title: 'An error occurred. Please try again later.',
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <>
      {children(onOpen)}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isLoading={isLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirmationModal;
