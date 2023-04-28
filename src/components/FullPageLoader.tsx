import { Center, Spinner } from '@chakra-ui/react';

const FullPageLoader = () => {
  return (
    <Center height="100vh" as="main" bg={'gray.50'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

export default FullPageLoader;
