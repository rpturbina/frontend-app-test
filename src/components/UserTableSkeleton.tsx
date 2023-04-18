import {
  Flex,
  Skeleton,
  SkeletonCircle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const SkeletonRow = ({ width }: { width: string }) => {
  return (
    <Tr>
      <Td>
        <Skeleton height="20px" width={width} borderRadius={'md'} />
      </Td>
      <Td>
        <Skeleton height="20px" width={width} borderRadius={'md'} />
      </Td>
      <Td>
        <Skeleton height="20px" width={width} borderRadius={'md'} />
      </Td>
      <Td>
        <Skeleton height="20px" width={width} borderRadius={'md'} />
      </Td>
      <Td>
        <Skeleton height="20px" width={width} borderRadius={'md'} />
      </Td>
      <Td>
        <Skeleton height="20px" width={width} borderRadius={'md'} />
      </Td>
      <Td>
        <Flex columnGap={4}>
          <SkeletonCircle size={'10'} />
          <SkeletonCircle size={'10'} />
          <SkeletonCircle size={'10'} />
        </Flex>
      </Td>
    </Tr>
  );
};

const UserTableSkeleton = () => {
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
          <SkeletonRow width="90px" />
          <SkeletonRow width="120px" />
          <SkeletonRow width="100px" />
          <SkeletonRow width="80px" />
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTableSkeleton;
