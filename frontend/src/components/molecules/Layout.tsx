import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';

interface LayoutProps {
  children: React.ReactNode;
  logout: () => void;
  home: () => void;
  compose: () => void;
}

export function Layout(props: LayoutProps) {
  return (
    <Flex direction="column" overflow="hidden" height="inherit">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="0.5rem"
        bg="#8E54A2"
        color="white"
        boxShadow="md"
      >
        <Flex onClick={props.home} cursor="pointer">
          <Heading as="h1" size="lg" mr={4}>
            <LogoIcon />
          </Heading>
          <Box display={['none', 'flex']} alignItems="center">
            cemail
          </Box>
        </Flex>
        <HStack>
          <Button colorScheme="whiteAlpha" onClick={props.compose}>
            Compose
          </Button>
          <Button colorScheme="blackAlpha" onClick={props.logout}>
            Logout
          </Button>
        </HStack>
      </Flex>
      <Flex flex={1} overflowY="auto" w="100%">
        {props.children}
      </Flex>
    </Flex>
  );
}
