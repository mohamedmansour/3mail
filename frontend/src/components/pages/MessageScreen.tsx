import { Button, Heading } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { NavMessageState, State } from 'contexts/State';

import { CgChevronLeft, CgTime, CgUser } from 'react-icons/cg';

type MessageScreenProps = {
  closeMessage: () => void;
  state: State;
};

function MessageScreen(props: MessageScreenProps) {
  const nav = props.state.nav as NavMessageState;
  return (
    <Flex direction="row" padding={4}>
      <Button onClick={props.closeMessage} flexShrink={0}>
        <CgChevronLeft />
      </Button>
      <Flex direction="column" marginLeft={4}>
        {nav.message && (
          <>
            <Heading>{nav.message.subject}</Heading>
            <Flex color="gray" alignItems="center">
              <CgUser />
              <Text marginRight={1}>
                {nav.message.sender} on{' '}
                {Intl.DateTimeFormat(navigator.language, {
                  dateStyle: 'long',
                  timeStyle: 'long',
                }).format(nav.message.date)}
              </Text>
              <CgTime />
            </Flex>
            <Text flexGrow={1} marginTop={4}>
              {nav.message.content}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default MessageScreen;
