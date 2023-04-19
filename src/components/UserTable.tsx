import { ViewIcon } from '@chakra-ui/icons';
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
import EditUserModal from '@/components/EditUserModal';

import { UserList } from '@/types';
import { formatDateToDateAndTime, formatDateToIDLocaleString } from '@/utils';

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
            <Tr key={`${user.id}-${user.createdAt}`.toLowerCase()}>
              <Td>{index + 1}</Td>
              <Td fontWeight={'medium'}>{user.name}</Td>
              <Td>{user.address}</Td>
              <Td>{user.gender}</Td>
              <Td>{formatDateToIDLocaleString(user.bornDate)}</Td>
              <Td>{formatDateToDateAndTime(user.createdAt)}</Td>
              <Td>
                <Flex columnGap={4}>
                  <IconButton
                    variant={'outline'}
                    icon={<ViewIcon />}
                    aria-label="View user detail"
                    size={'sm'}
                    border={'none'}
                  />
                  <EditUserModal
                    initialValues={{
                      name: user.name,
                      address: user.address,
                      gender: user.gender,
                      bornDate: user.bornDate,
                    }}
                  />
                  <DeleteConfirmationModal id={user.id} />
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
