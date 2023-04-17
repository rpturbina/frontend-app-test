import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
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

import { User } from '@/types';
import { formatDateToIDLocaleString } from '@/utils';

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <TableContainer mt={4}>
      <Table variant="simple" size={['sm', 'md']}>
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Nama</Th>
            <Th>Alamat</Th>
            <Th>P/W</Th>
            <Th>Tanggal Lahir</Th>
            <Th>Tanggal Input</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={user.createdAt}>
              <Td>{index + 1}</Td>
              <Td fontWeight={'medium'}>{user.name}</Td>
              <Td>{user.address}</Td>
              <Td>{user.gender}</Td>
              <Td>{formatDateToIDLocaleString(user.birthDate)}</Td>
              <Td>{user.createdAt}</Td>
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
                      birthDate: new Date(user.birthDate),
                    }}
                  />
                  <DeleteConfirmationModal />
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
