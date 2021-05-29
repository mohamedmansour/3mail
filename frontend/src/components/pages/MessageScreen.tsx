import { Button, Heading } from '@chakra-ui/react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import MailboxItem from 'components/molecules/MailboxItem';
import { NavMessageState, State, StoredMessage } from 'contexts/State';

type MessageScreenProps = {
  closeMessage: () => void;
  state: State;
};

function MessageScreen(props: MessageScreenProps) {
  const nav = props.state.nav as NavMessageState;
  return (
    <Flex direction="row">
      <Button onClick={props.closeMessage}>Back to mailbox</Button>
      <Flex direction="column">
        {nav.message && (
          <>
            <Heading>{nav.message.subject}</Heading>
            <Box flexGrow={1}>{nav.message.content}</Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default MessageScreen;
