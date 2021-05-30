import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';
import React, { useEffect } from 'react';
import { CgSearch } from 'react-icons/cg';
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { StoredMessage } from 'contexts/State';

interface LayoutProps {
  children: React.ReactNode;
  logout: () => void;
  home: () => void;
  compose: () => void;
  search: (query: string) => void;
  searchClosed: () => void;
  openMessage: (id: string) => void;
  searchResults: StoredMessage[];
}

export function Layout(props: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchClosed, searchResults } = props;

  useEffect(() => {
    if (!isOpen) {
      searchClosed();
    }
  }, [searchClosed, isOpen]);

  const handleSearchItemVisited = (id: string) => {
    onClose();
    props.openMessage(id);
  };

  return (
    <>
      <Flex direction="column" overflow="hidden" height="inherit">
        <HStack
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
          <HStack
            w="50%"
            rounded="lg"
            background="rgba(255,255,255,0.5)"
            height="100%"
            boxShadow="md"
            paddingLeft={2}
            color="whiteAlpha.800"
            onClick={onOpen}
          >
            <CgSearch />
            <Text>Search mail</Text>
          </HStack>
          <HStack>
            <Button colorScheme="whiteAlpha" onClick={props.compose}>
              Compose
            </Button>
            <Button colorScheme="blackAlpha" onClick={props.logout}>
              Logout
            </Button>
          </HStack>
        </HStack>
        <Flex flex={1} overflowY="auto" w="100%">
          {props.children}
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <HStack>
              <CgSearch fontSize={24} color="#8E54A2" />
              <Input
                type="text"
                border={0}
                outlineColor="transparent"
                focusBorderColor="transparent"
                placeholder="Search mail"
                onChange={(e) => props.search(e.target.value)}
              />
            </HStack>
            {!!searchResults.length && (
              <Box>
                <Divider />
                <Box alignItems="flex-start">
                  {searchResults.map((result, idx) => (
                    <Box
                      key={idx}
                      onClick={() => handleSearchItemVisited(result.id)}
                      isTruncated
                      bg="gray.100"
                      rounded="lg"
                      padding={2}
                      marginBottom={2}
                      _hover={{
                        backgroundColor: '#8E54A2',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {result.subject}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
