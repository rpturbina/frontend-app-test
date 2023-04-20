import {
  Flex,
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
                  <EditUserModal
                    initialValues={{
                      ...user,
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
