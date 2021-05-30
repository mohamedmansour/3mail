import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';

interface HeaderProps {
  logout: () => void;
  home: () => void;
}
const Header = (props: HeaderProps) => {
  return (
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
  );
};

export default Header;
