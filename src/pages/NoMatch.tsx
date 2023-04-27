import { Link } from 'react-router-dom';

import { Box, Button, Heading, Text } from '@chakra-ui/react';

import Layout from '@/components/Layout';

const NoMatch = () => {
  return (
    <Layout>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, blue.400, blue.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize={'lg'} mt={3}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mt={2}>
          The page you&apos;re looking for does not seem to exist
        </Text>

        <Link to={'/'}>
          <Button
            mt={6}
            colorScheme="blue"
            bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </Link>
      </Box>
    </Layout>
  );
};

export default NoMatch;
