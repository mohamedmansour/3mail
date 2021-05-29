import { Flex } from '@chakra-ui/layout';
import MailboxItem from 'components/molecules/MailboxItem';
import { State, StoredMessage } from 'contexts/State';

type MailboxScreenProps = {
  state: State;
  openMessage: (id: string) => void;
};

function MailboxScreen(props: MailboxScreenProps) {
  return (
    <Flex direction="column">
      {props.state.messages.map((message) => (
        <MailboxItem
          message={message}
          onClick={() => props.openMessage(message.id)}
        />
      ))}
    </Flex>
  );
}

export default MailboxScreen;
