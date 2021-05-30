import { VStack } from '@chakra-ui/react';
import MailboxItem from 'components/molecules/MailboxItem';
import { State } from 'contexts/State';

type MailboxScreenProps = {
  state: State;
  openMessage: (id: string) => void;
};

function MailboxScreen(props: MailboxScreenProps) {
  return (
    <VStack align="stretch" spacing={0} width="inherit">
      {props.state.messages.map((message, idx) => (
        <MailboxItem
          key={idx}
          message={message}
          onClick={() => props.openMessage(message.id)}
        />
      ))}
    </VStack>
  );
}

export default MailboxScreen;
