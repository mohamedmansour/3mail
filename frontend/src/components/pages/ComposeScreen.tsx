import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { LogoIcon } from 'components/branding/Logo';
import { State } from 'contexts/State';
import React from 'react';
import { CgChevronLeft } from 'react-icons/cg';

type ComposeScreenProps = {
  closeMessage: () => void;
  state: State;
};

export function ComposeScreen(props: ComposeScreenProps) {
  return (
    <Flex direction="row" padding={4} width="inherit">
      <Button onClick={props.closeMessage} flexShrink={0}>
        <CgChevronLeft />
      </Button>
      <VStack marginLeft={4} flex={1} alignItems="flex-start">
        <Heading size="md">New message</Heading>
        <FormControl id="ens">
          <Input type="text" placeholder="ENS Recipients" autoFocus />
        </FormControl>
        <FormControl id="subject">
          <Input type="text" placeholder="Subject" />
        </FormControl>
        <FormControl id="content" flex={1}>
          <Textarea h="100%" />
        </FormControl>
        <Button colorScheme="purple">
          <LogoIcon marginRight={2} fontSize={24} />
          Send
        </Button>
      </VStack>
    </Flex>
  );
}
