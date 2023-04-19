import {
  BorderProps,
  Flex,
  LayoutProps,
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

const SkeletonRow = ({
  borderRadius,
  height,
}: {
  borderRadius: BorderProps['borderRadius'];
  height: LayoutProps['height'];
}) => {
  return (
    <Tr>
      <Td>
        <Skeleton height={height} borderRadius={borderRadius} />
      </Td>
      <Td>
        <Skeleton height={height} borderRadius={borderRadius} />
      </Td>
      <Td>
        <Skeleton height={height} borderRadius={borderRadius} />
      </Td>
      <Td>
        <Skeleton height={height} borderRadius={borderRadius} />
      </Td>
      <Td>
        <Skeleton height={height} borderRadius={borderRadius} />
      </Td>
      <Td>
        <Skeleton height={height} borderRadius={borderRadius} />
      </Td>
      <Td>
        <Flex columnGap={4}>
          <SkeletonCircle size={'8'} />
          <SkeletonCircle size={'8'} />
          <SkeletonCircle size={'8'} />
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
            <Th>L/P</Th>
            <Th>Tanggal Lahir</Th>
            <Th>Tanggal Input</Th>
            <Th>Aksi</Th>
          </Tr>
        </Thead>
        <Tbody>
          <SkeletonRow height={'1rem'} borderRadius={'lg'} />
          <SkeletonRow height={'1rem'} borderRadius={'lg'} />
          <SkeletonRow height={'1rem'} borderRadius={'lg'} />
          <SkeletonRow height={'1rem'} borderRadius={'lg'} />
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTableSkeleton;
