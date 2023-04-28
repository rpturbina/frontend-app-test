import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const UserDetailCardSkeleton = () => {
  return (
    <Box
      maxW={'xs'}
      w={'full'}
      mx="auto"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Skeleton isLoaded={false} w={'full'} h={56} />
      <Box pt={4} pb={6} px={6}>
        <Skeleton borderRadius={'lg'} h={7} />
        <Flex
          alignItems="center"
          mt={4}
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <SkeletonCircle size={'7'} />
          <Skeleton ml={4} borderRadius={'lg'} w={'60%'} h={5} />
        </Flex>

        <Flex
          alignItems="center"
          mt={4}
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <SkeletonCircle size={'7'} />

          <Skeleton ml={4} borderRadius={'lg'} w={'50%'} h={5} />
        </Flex>

        <Flex
          alignItems="center"
          mt={4}
          color="gray.700"
          _dark={{
            color: 'gray.200',
          }}
        >
          <SkeletonCircle size={'7'} />
          <Skeleton ml={4} borderRadius={'lg'} w={'40%'} h={5} />
        </Flex>
      </Box>
    </Box>
  );
};

export default UserDetailCardSkeleton;
