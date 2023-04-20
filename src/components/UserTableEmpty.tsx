import { Flex, Heading, Text } from '@chakra-ui/react';

const UserTableEmpty = () => {
  return (
    <Flex
      justify="center"
      backgroundColor="white"
      borderRadius={'8px'}
      p={[8, 16]}
      direction="column"
      align="center"
      w="100%"
    >
      <Heading size={['md', 'lg']} mt={8} textAlign={'center'}>
        You haven&apos;t added any users.
      </Heading>
      <Text mt={2}>Welcome. Let&apos;s get started.</Text>
    </Flex>
  );
};

export default UserTableEmpty;
