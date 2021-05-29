import { Box, Button, Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="0.5rem"
      bg="black"
      color="white"
    >
      <Flex>
        <Heading as="h1" size="lg" mr={4}>
          C
        </Heading>

        <Box display={["none", "flex"]} alignItems="center">
          Menu
        </Box>
      </Flex>
      <Box>
        <Button bg="transparent" border="1px">
          Login
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
