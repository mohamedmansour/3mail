import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';

interface LayoutProps {
  children: React.ReactNode;
  logout: () => void;
  home: () => void;
}

export function Layout(props: LayoutProps) {
  return (
    <Flex direction="column" overflow="hidden">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="0.5rem"
        bg="purple"
        color="white"
      >
        <Flex onClick={props.home} cursor="pointer">
          <Heading as="h1" size="lg" mr={4}>
            <LogoIcon />
          </Heading>
          <Box display={['none', 'flex']} alignItems="center">
            cemail
          </Box>
        </Flex>
        <Box>
          <Button colorScheme="blackAlpha" border="1px" onClick={props.logout}>
            Logout
          </Button>
        </Box>
      </Flex>
      <Flex flex={1} overflowY="auto" w="100%">
        {props.children}
      </Flex>
    </Flex>
  );
}
