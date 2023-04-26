import { MouseEventHandler } from 'react';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import UserFormModal from '@/components/UserFormModal';
import ViewUserDetailButton from '@/components/ViewUserDetailButton';

import { UserList } from '@/types';
import {
  formatDateToDateAndTimeGMT7,
  formatDateToIDLocaleString,
} from '@/utils';

const UserTable = ({ users }: { users: UserList }) => {
  return (
    <TableContainer mt={4}>
      <Table variant="simple" size={['sm', 'md']}>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Alamat</Th>
            <Th>L/P</Th>
            <Th>Tanggal Lahir</Th>
            <Th>Tanggal Input</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user, index) => (
            <Tr key={`${user.id}-${user.created_at}`.toLowerCase()}>
              <Td>{index + 1}</Td>
              <Td fontWeight={'medium'}>{user.name}</Td>
              <Td>{user.address}</Td>
              <Td>{user.gender.toUpperCase()}</Td>
              <Td>{formatDateToIDLocaleString(user.born_date)}</Td>
              <Td>{formatDateToDateAndTimeGMT7(user.created_at)}</Td>
              <Td>
                <Flex columnGap={4}>
                  <ViewUserDetailButton id={`${user.id}`} />
                  <UserFormModal
                    isEditing
                    initialValues={{
                      ...user,
                    }}
                  >
                    {(
                      onOpen: MouseEventHandler<HTMLButtonElement> | undefined
                    ) => (
                      <IconButton
                        variant={'outline'}
                        icon={<EditIcon />}
                        aria-label="Edit user"
                        colorScheme="blue"
                        size={'sm'}
                        border={'none'}
                        onClick={onOpen}
                      />
                    )}
                  </UserFormModal>
                  <DeleteConfirmationModal id={user.id}>
                    {(onOpen) => (
                      <IconButton
                        variant={'outline'}
                        icon={<DeleteIcon />}
                        aria-label="Delete user"
                        colorScheme="red"
                        size={'sm'}
                        border={'none'}
                        onClick={onOpen}
                      />
                    )}
                  </DeleteConfirmationModal>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
