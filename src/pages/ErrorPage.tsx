import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';

import Layout from '@/components/Layout';

const ErrorPage = () => {
  return (
    <Layout>
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg={'red.500'}
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign="center"
          >
            <CloseIcon boxSize={'20px'} color={'white'} />
          </Flex>
        </Box>
        <Heading as="h2" size={['md', 'lg']} mt={6}>
          Something went wrong
        </Heading>
        <Link href={'/'}>
          <Button
            colorScheme="blue"
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
            mt={6}
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default ErrorPage;
